import { useContext, useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router';
import { UserContext } from './contexts/UserContext';

import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import CocktailList from './components/CocktailList/CocktailList';
import CocktailForm from './components/CocktailForm/CocktailForm';
//import CocktailsData from './cocktailsData.js' test data


import * as cocktailService from './services/cocktailService';



function App() {
  const { user } = useContext(UserContext);
  const [cocktails, setCocktails] = useState([]);
  const navigate = useNavigate();

  const handleAddCocktail = async (cocktailFormData) => {
    const newCocktail = await cocktailService.create(cocktailFormData);
    setCocktails([newCocktail, ...cocktails]);
    navigate ('/cocktails');
  };
  const handleDeleteCocktail = async (cocktailId) => {
    const deletedCocktail = await cocktailService.deleteCocktail(cocktailId);
    setCocktails(cocktails.filter((cocktail) => cocktail._id !== deletedCocktail._id));
    navigate('/cocktails');
  };

  useEffect(() => {
    const fetchAllCocktails = async () => {
      const cocktailsData = await cocktailService.index();
      setCocktails(cocktailsData);
    }
  if(user) fetchAllCocktails()
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
          <Route path='/cocktails/:cocktailId' element={<CocktailForm handleDeleteCocktail={handleDeleteCocktail} />} />
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