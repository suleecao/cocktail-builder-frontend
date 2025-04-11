import React, { useEffect, useState, useContext } from "react";
import { UserContext } from '../../contexts/UserContext';
import { Link } from "react-router-dom";
import { getRandom } from "../../services/cocktailService";
import { addToFavorites } from "../../services/userService";
import styles from "./CocktailList.module.css";

const CocktailList = () => {
  const [cocktails, setCocktails] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchCocktails = async () => {
      const promises = Array.from({ length: 6 }, () => getRandom());
      const results = await Promise.all(promises);

      const validResults = results.filter(Boolean);
      setCocktails(validResults[0]);
    };

    fetchCocktails();
  }, []);

  const toggleFavorite = (cocktail) => {
    
    console.log(cocktail);
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(cocktail.drinkName)) {
        return prevFavorites.filter((name) => name !== cocktail.drinkName);
      } else {
        addToFavorites(user._id, cocktail._id)
        return [...prevFavorites, cocktail.drinkName];
      }
    });
  };


  if (cocktails.length === 0) return <p>Loading...</p>;

  return (
    <main className={styles.pageWrapper}>
      <h1>You May Like These Cocktails</h1>

      <div className={styles.container}>
        {cocktails.map((cocktail, index) => (
            <article key={index}>
          <Link to={`/cocktails/${cocktail._id}`}>
          <div className={styles.imageWrapper}>
                <img
                  src={cocktail.image}
                  alt={cocktail.drinkName}
                  className={styles.cocktailImage}
                />
              </div>
              <div className={styles.contentWrapper}>
                <header>
                  <h2>{cocktail.drinkName}</h2>
                </header>
                <p>{cocktail.instructions?.slice(0, 100)}...</p>
              </div>
            </Link>
           <button onClick={() => toggleFavorite(cocktail)}>
         {favorites.includes(cocktail) ? 'Remove from Favorites' : 'Add to Favorites'}
       </button>
       </article>
      ))}
      </div>
    </main>
  );
};

export default CocktailList;
