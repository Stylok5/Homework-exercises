import { useState } from "react";
import axios from "axios";
import { API_URL } from "../consts";

const AddBeerPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    strength: "",
    image: "",
  });

  const [showError, setShowError] = useState(false);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const requestConfig = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      console.log("Request config", requestConfig);
      const res = await axios.post(
        `${API_URL}/crafty-beers`,
        formData,
        requestConfig
      );
    } catch (e) {
      console.log(e);
      setShowError(true);
    }
  };

  return (
    <div className="addBeerPage">
      <h1>Add you own beer</h1>
      <form onSubmit={onSubmit} className="addBeerForm">
        {showError && (
          <div>
            <h4>There was an error</h4>
          </div>
        )}
        <input
          className="addBeerInput"
          placeholder="Name"
          value={formData.name}
          name="name"
          type="text"
          onChange={onChange}
        />
        <input
          className="addBeerInput"
          placeholder="Description"
          value={formData.description}
          name="description"
          type="text"
          onChange={onChange}
        />
        <input
          className="addBeerInput"
          placeholder="Type"
          value={formData.type}
          name="type"
          type="text"
          onChange={onChange}
        />
        <input
          className="addBeerInput"
          placeholder="Strengh"
          value={formData.strength}
          name="strength"
          type="number"
          onChange={onChange}
        ></input>
        <input
          className="addBeerInput"
          placeholder="Image"
          value={formData.image}
          name="image"
          type="text"
          onChange={onChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};
export default AddBeerPage;
