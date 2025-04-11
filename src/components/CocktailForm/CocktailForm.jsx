import React, { useState, useEffect } from "react";
import { useParams }  from "react-router";
import styles from "../Form.module.css";
import CocktailList from "../CocktailList/CocktailList";
import * as CocktailService from '../../services/cocktailService'

const unitOptions = ["oz", "tsp", "tbsp", "ml", "dash", "drop", "cup", "part"];
const glassesArr = [
  "Highball glass",
  "Old-fashioned glass",
  "Cocktail glass",
  "Copper Mug",
  "Whiskey Glass",
  "Collins glass",
  "Pousse cafe glass",
  "Champagne flute",
  "Whiskey sour glass",
  "Brandy snifter",
  "White wine glass",
  "Nick and Nora Glass",
  "Hurricane glass",
  "Coffee mug",
  "Shot glass",
  "Jar",
  "Irish coffee cup",
  "Punch bowl",
  "Pitcher",
  "Pint glass",
  "Cordial glass",
  "Beer mug",
  "Margarita/Coupette glass",
  "Beer pilsner",
  "Beer Glass",
  "Parfait glass",
  "Wine Glass",
  "Mason jar",
  "Margarita glass",
  "Martini Glass",
  "Balloon Glass",
  "Coupe Glass",
];

 const CocktailForm = (props) => {
  const [cocktailName, setCocktailName] = useState("");
  const [directions, setDirections] = useState("");
  const [glass, setGlass] = useState(glassesArr[""]);
  const [ingredients, setIngredients] = useState([
    { name: "", amount: "", unit: "oz" },
  ]);
  const { cocktailId } = useParams();
  console.log(cocktailId);

  const handleIngredientChange = (index, field, value) => {
    const updated = [...ingredients];
    updated[index][field] = value;
    setIngredients(updated);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: "", unit: "oz" }]);
  };

  const removeIngredient = (index) => {
    const filtered = ingredients.filter((_, i) => i !== index);
    setIngredients(filtered);
  };

  const joinIngredients = (index) => {
    const ingredient = ingredients[index];
    console.log(`${ingredient.name} : ${ingredient.amount} ${ingredient.unit}`);
  };

  const handleEditCocktail= (evt) => {
    evt.preventDefault();
    if (cocktailId) {
      props.handleUpdateCocktail(cocktailId, setIngredients);
    } else {
      props.handleAddCocktail(setCocktailName)
    }
  };

  const handleDeleteCocktail = (cocktailId) => {
    props.handleDeleteCocktail(cocktailId);
  };

  useEffect(() => {
    const fetchCocktail = async () => {
      const cocktailData = await CocktailService.show(cocktailId);
      setIngredients(cocktailData);
    };
    if (cocktailId) fetchCocktail();
    return () => setIngredients({ name: "", amount: "", unit: "oz" });
}, [cocktailId]);

  return (
    <div className={styles.formWrapper}>
      <form className={styles.formContainer}>
        <h1 className={styles.formTitle}>Make Your Own Recipe</h1>

        <div>
          <label>Cocktail Name</label>
          <input
            type="text"
            value={cocktailName}
            onChange={(e) => setCocktailName(e.target.value)}
          />
        </div>

        <div>
          <label>Ingredients</label>
          {ingredients.map((ingredient, index) => (
            <div key={index} className={styles.ingredientGroup}>
              <input
                type="text"
                placeholder="Ingredient"
                value={ingredient.name}
                onChange={(e) =>
                  handleIngredientChange(index, "name", e.target.value)
                }
              />
              <input
                type="number"
                placeholder="Amount"
                value={ingredient.amount}
                onChange={(e) =>
                  handleIngredientChange(index, "amount", e.target.value)
                }
              />
              <select
                value={ingredient.unit}
                onChange={(e) =>
                  handleIngredientChange(index, "unit", e.target.value)
                }
              >
                {unitOptions.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
              <div className={styles.buttonGroup}>
                <button type="button" onClick={() => removeIngredient(index)}>
                  Remove Ingredient
                </button>
              </div>
            </div>
          ))}
        </div>

        <div>
          <label>Glassware</label>
          <input
            list="glassware-options"
            value={glass}
            onChange={(e) => setGlass(e.target.value)}
            placeholder="Select or type a glass"
          />
          <datalist id="glassware-options">
            {glassesArr.map((glassOption, index) => (
              <option key={index} value={glassOption} />
            ))}
          </datalist>
        </div>

        <div>
          <label>Directions</label>
          <textarea
            value={directions}
            onChange={(e) => setDirections(e.target.value)}
          />
        </div>
        <div>
          <h2>{cocktail.creator === user._id && (
            <button onClick={handleEditCocktail}>Edit drink</button>
          )}
          </h2>
          <h2>{cocktail.creator === user._id && (
            <button onClick={props.handleDeleteCocktail(cocktailId)}>Delete drink</button>
          )}
          </h2>
        
        </div>
        <div className={styles.buttonGroup}>
          <button type="button" onClick={addIngredient}>
            Add Ingredient
          </button>
          <button type="submit">Submit Drink</button>
        </div>
      </form>
    </div>
  );
}

export default CocktailForm;
