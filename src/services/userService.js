const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;

const index = async () => {
  try {
    const res = await fetch(BASE_URL, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    const data = await res.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error(error);
  }
};

 const getFavorites = async (userId) => {
    try {
      const res = await fetch(`${BASE_URL}/${userId}/favorites`,{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
      });
      return res.json();
    } catch (error) {
      console.error("Error fetching favorite cocktail:", error);
    }
  };

  const addToFavorites = async (userId, cocktailId) => {
    try {
      const res = await fetch(`${BASE_URL}/${userId}/favorites`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`, 
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cocktailId, 
        }),
      });
  
      if (!res.ok) {
        throw new Error("Failed to add to favorites");
      }
  
      const data = await res.json();
      console.log("Added to favorites:", data);
      return data;
  
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  };


export {
  index, getFavorites, 
  addToFavorites
};
