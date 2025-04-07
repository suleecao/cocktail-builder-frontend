import { useParams } from "react-router";
import cocktailsData from "../../cocktailsData";

const CocktailDetails = () => {
    const { id } = useParams();
    console.log('cocktail ID', id);

    const cocktail = cocktailsData.find(c => c.name === id);

    return (
        <main>
        <h1>{cocktail.name}</h1>
        <img src={cocktail.image} alt={cocktail.name} />
        <p>{cocktail.instructions}</p>
        <h2>Ingredients</h2>
        <ul>
            {Object.entries(cocktail.ingredients).map(([ingredient, amount]) => (
                <li key={ingredient}>{ingredient}: {amount}</li>
            ))}
        </ul>
    </main>
);
};


export default CocktailDetails;