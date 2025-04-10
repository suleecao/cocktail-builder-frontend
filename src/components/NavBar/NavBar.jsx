import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';
import Logo from '../../assets/images/cocktail-logo.svg';
import styles from './NavBar.module.css';

const NavBar = () => {
    const { user, setUser } = useContext(UserContext);
    
    const handleSignOut = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <nav className={styles.container}>
            <Link to="/">
                <img
                src={Logo}
                alt="Cocktail Builder Logo"
                className={styles.logo}
                />
            </Link>


            <ul>
                {user ? (
                    <>
                        <li>
                            <Link to="/">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/add">
                                Add CockTail
                            </Link>
                        </li>
                        <li>
                            <Link to="/cocktails">
                                Random Drinks
                            </Link>
                        </li>
                        <li>
                            <Link onClick={handleSignOut} to="/">Sign Out</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/sign-in">
                                Sign In
                            </Link>
                        </li>
                        <li>
                            <Link to="/sign-up">
                                Sign Up
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default NavBar;