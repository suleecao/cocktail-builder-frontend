import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getRandom } from '../../services/cocktailService';

const CocktailList = () => {
  const [cocktails, setCocktails] = useState([]);

  useEffect(() => {
    const fetchCocktails = async () => {
      const promises = Array.from({ length: 5 }, () => getRandom());
      const results = await Promise.all(promises);


      const validResults = results.filter(Boolean);
      setCocktails(validResults);
    };

    fetchCocktails();
  }, []);

  if (cocktails.length === 0) return <p>Loading...</p>;

  return (
    <main>
      {cocktails.map((cocktail, index) => (
        <Link key={index} to={`/cocktails/${cocktail.name}`}>
          <article>
            <header>
              <h2>{cocktail.name}</h2>
              <p>{cocktail.instructions?.slice(0, 100)}...</p>
            </header>
            <img src={cocktail.image} alt={cocktail.name} width="300" className="rounded-img" />
          </article>
        </Link>
      ))}
    </main>
  );
};

export default CocktailList;