import React from 'react';

const CocktailFavorites = ({ favorites }) => (
    <ul>
      {favorites.map((fav, index) => (
        <li key={index}>
          <img src={fav.image} alt={fav.drinkName} width="100" />
          <p>{fav.drinkName}</p>
        </li>
      ))}
    </ul>
  );
  

export default CocktailFavorites;