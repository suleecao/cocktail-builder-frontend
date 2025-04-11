import { useEffect, useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { index } from "../../services/userService";
import styles from "./Dashboard.module.css";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await index();
        setUsers(fetchedUsers);
      } catch (error) {
        console.log(error);
      }
    };
    if (user) fetchUsers();
  }, [user]);

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>Hey, {user?.username}!</h1>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Search cocktails or ingredients..."
            className={styles.searchInput}
          />
        </div>
      </header>

      <section className={styles.categorySection}>
        <h3>Category</h3>
        <div className={styles.buttonGroup}>
          <Link to="/add" className={styles.dashboardButton}>
            Add Drink
          </Link>
          <Link to="/cocktails" className={styles.dashboardButton}>
            Random
          </Link>
          <Link to="/favorites" className={styles.dashboardButton}>
            Favorites
          </Link>
          <button className={styles.dashboardButtonSecondary}>Popular</button>
        </div>
      </section>

      <section className={styles.recommendations}>
        <h3>You Might Like</h3>
        <div className={styles.cardGrid}>
          {[1, 2, 3, 4].map((_, index) => (
            <Link key={index} to={`/cocktails/${index}`}>
              <article>
              <div className={styles.imageWrapper}>
                <img
                  src={`https://placehold.co/200x200?`}
                  alt="Cocktail"
                  className={styles.cocktailImage}
                />
              </div>
              <div className={styles.contentWrapper}>
                <header>
                  <h2>Cocktail Name</h2>
                </header>
                <p>Lime, mint, sugar, gin</p>
              </div>
            </article>
          </Link>
          ))}
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
