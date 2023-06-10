import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../consts";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConfirmation: "",
    email: "",
  });
  console.log(formData);
  const [showError, setError] = useState(false);
  const navigate = useNavigate();
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log("clicked");
    try {
      await axios.post(`${API_URL}/register`, formData);
      navigate("/login");
    } catch (e) {
      console.log(e);
      setError(true);
    }
  };

  return (
    <div className="registerPage">
      <h1>Register</h1>
      {showError && (
        <div className="error">
          <h3>Something went wrong.</h3>
        </div>
      )}
      <form className="inputsForm" onSubmit={onSubmit}>
        <input
          className="inputText"
          type="text"
          placeholder="Username"
          name="username"
          value={formData.username}
          onChange={onChange}
        />
        <input
          className="inputText"
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={onChange}
        />
        <input
          className="inputText"
          type="password"
          placeholder="Confirm Password"
          name="passwordConfirmation"
          value={formData.passwordConfirmation}
          onChange={onChange}
        />
        <input
          className="inputText"
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={onChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default RegisterPage;
