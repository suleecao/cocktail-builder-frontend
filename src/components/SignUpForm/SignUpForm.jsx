import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signUp } from "../../services/authService";
import { UserContext } from "../../contexts/UserContext";
import styles from "../Form.module.css";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConf: "",
  });

  const { username, password, passwordConf } = formData;

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
      const newUser = await signUp(formData);
      setUser(newUser);
      navigate("/");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <div className={styles.formWrapper}>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <h1>Create Your Account</h1>
        <p>{message}</p>

        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            placeholder="Username"
            id="username"
            value={username}
            onChange={handleChange}
            name="username"
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="passwordConf">Confirm Password:</label>
          <input
            type="password"
            placeholder="Confirm Password"
            id="passwordConf"
            name="passwordConf"
            value={passwordConf}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.buttonGroup}>
          <button disabled={isFormInvalid()}>Sign Up</button>
          <button type="button" onClick={() => navigate("/")}>
            Cancel
          </button>
        </div>

        <p className={styles.prompt}>
          Already have an account? <Link to="/sign-in">Sign In.</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
