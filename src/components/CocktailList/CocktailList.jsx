import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRandom } from "../../services/cocktailService";
import styles from "./CocktailList.module.css";

const CocktailList = () => {
  const [cocktails, setCocktails] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchCocktails = async () => {
      const promises = Array.from({ length: 6 }, () => getRandom());
      const results = await Promise.all(promises);

      const validResults = results.filter(Boolean);
      setCocktails(validResults);
    };

    fetchCocktails();
  }, []);

  const toggleFavorite = (cocktailName) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(cocktailName)) {
        return prevFavorites.filter((name) => name !== cocktailName);
      } else {
        return [...prevFavorites, cocktailName];
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
          <Link to={`/cocktails/${cocktail.name}`}>
          <div className={styles.imageWrapper}>
                <img
                  src={cocktail.image}
                  alt={cocktail.name}
                  className={styles.cocktailImage}
                />
              </div>
              <div className={styles.contentWrapper}>
                <header>
                  <h2>{cocktail.name}</h2>
                </header>
                <p>{cocktail.instructions?.slice(0, 100)}...</p>
              </div>
            </Link>
           <button onClick={() => toggleFavorite(cocktail.name)}>
         {favorites.includes(cocktail.name) ? 'Remove from Favorites' : 'Add to Favorites'}
       </button>
       </article>
      ))}
      </div>
    </main>
  );
};

export default CocktailList;
