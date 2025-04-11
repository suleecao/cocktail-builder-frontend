import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import { UserContext } from './contexts/UserContext';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import CocktailList from './components/CocktailList/CocktailList';
import CocktailDetails from './components/CocktailDetails/CocktailDetails.jsx';
import CocktailForm from './components/CocktailForm/CocktailForm';
import CocktailFavorites from './components/CocktailFavorites/CocktailFavorites.jsx';
import * as cocktailService from './services/cocktailService';
import * as userService from './services/userService';

function App() {
  const { user } = useContext(UserContext);
  const [cocktails, setCocktails] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const handleAddCocktail = async (cocktailFormData) => {
    const newCocktail = await cocktailService.create(cocktailFormData);
    setCocktails([newCocktail, ...cocktails]);
    navigate ('/cocktails/favorites');
  };
  const handleDeleteCocktail = async (cocktailId) => {
    const deletedCocktail = await cocktailService.deleteCocktail(cocktailId);
    setCocktails(cocktails.filter((cocktail) => cocktail._id !== deletedCocktail._id));
    navigate('/cocktails/favorites');
  };
  
 const handleGetFavorites = async () => {
    try {
      const userFavorites = await userService.getFavorites(user._id);
      console.log('Fetched favorites:', userFavorites);
      setFavorites(userFavorites);
    } catch (err) {
      console.error('Error fetching favorites:', err);
      setFavorites([]); 
    }
  };

  useEffect(() => {
    const fetchAllCocktails = async () => {
      const cocktailsData = await cocktailService.index();
      setCocktails(cocktailsData);
    }
  if(user) {
      fetchAllCocktails()
      handleGetFavorites();
    }
  }, [user]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        {
          user ? (
          <>
          <Route path='/cocktails' element={<CocktailList cocktails={cocktails}/>} />
          <Route path='/cocktails/new' element={<CocktailForm handleAddCocktail={handleAddCocktail} />} />
          <Route path='/cocktails/:cocktailId' element={<CocktailDetails handleDeleteCocktail={handleDeleteCocktail} />} />
          <Route path='/add' element={<CocktailForm />} />
          <Route path='/random' element={<CocktailList />} />
          <Route path='/favorites' element={<CocktailFavorites favorites={ favorites }/>} />
          </>
          ) : (
         <>
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
        </>
          )
        }
      </Routes>
    </>
  );
}

export default App;
