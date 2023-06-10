import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../consts";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const { data } = await axios.post(`${API_URL}/login`, formData);
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (e) {
      console.log(e);
      setError(true);
    }
  };

  return (
    <div className="loginPage">
      <h1>Login</h1>
      {showError && (
        <div className="error">
          <h3>Something went wrong.</h3>
        </div>
      )}
      <form className="inputsForm" onSubmit={onSubmit}>
        <input
          className="inputText"
          type="text"
          placeholder="Email"
          name="email"
          value={formData.email}
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginPage;
