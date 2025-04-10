import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRandom } from "../../services/cocktailService";
import styles from "./CocktailList.module.css";

const CocktailList = () => {
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    const fetchCocktails = async () => {
      const promises = Array.from({ length: 6 }, () => getRandom());
      const results = await Promise.all(promises);
      const validResults = results.filter(Boolean);
      setCocktails(validResults[0]);
    };

    fetchCocktails();
  }, []);

  if (cocktails.length === 0) return <p>Loading...</p>;

  return (
    <main className={styles.pageWrapper}>
      <h1>You May Like These Cocktails</h1>

      <div className={styles.container}>
        {cocktails.map((cocktail, index) => (
          <Link key={index} to={`/cocktails/${cocktail.drink}`}>
            <article key={index}>
              <div className={styles.imageWrapper}>
                <img
                  src={cocktail.image}
                  alt={cocktail.name}
                  className={styles.cocktailImage}
                />
              </div>
              <div className={styles.contentWrapper}>
                <header>
                  <h2>{cocktail.drinkName}</h2>
                </header>
                <p>{cocktail.instructions?.slice(0, 100)}...</p>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default CocktailList;
