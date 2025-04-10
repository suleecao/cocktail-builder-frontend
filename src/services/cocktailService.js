
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/cocktails`;


const getRandom = async () => {
  try {
    const res = await fetch(`${BASE_URL}/random`);
    const data = res.json()
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching random cocktail:", error);
  }
};


const searchByName = async (cocktailName) => {
  try {
    const res = await fetch(`${BASE_URL}/${cocktailName}`);
    return res.json();
  } catch (error) {
    console.error("Error searching for cocktail:", error);
  }
};

const addToFavorites = async(userId) =>{
  try{
    const res = await fetch(`${BASE_URL}/${userId}/favorites`,{
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json"
      }
      })
  }
}
export {
  getRandom,
  searchByName
};
