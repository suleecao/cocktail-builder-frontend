import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signIn } from "../../services/authService";
import { UserContext } from "../../contexts/UserContext";
import styles from "../Form.module.css";

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (evt) => {
    setMessage("");
    setFormData({
      ...formData,
      [evt.target.name]: evt.target.value,
    });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const signedInUser = await signIn(formData);
      setUser(signedInUser);
      navigate("/");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h1>Welcome, Sign In</h1>
        <p>{message}</p>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            autoComplete="off"
            id="username"
            value={formData.username}
            placeholder="Username"
            name="username"
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            autoComplete="off"
            placeholder="Password"
            id="password"
            value={formData.password}
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.buttonGroup}>
          <button>Sign In</button>
          <button onClick={() => navigate("/")}>Cancel</button>
        </div>
        <p className={styles.prompt}>
          Don’t have an account yet? <Link to="/sign-up">Sign Up.</Link>
        </p>
      </form>
    </div>
  );
};

export default SignInForm;
