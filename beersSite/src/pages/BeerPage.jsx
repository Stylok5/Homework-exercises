import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../consts";

const BeerPage = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "",
    strength: "",
    image: "",
  });
  const [showError, setShowError] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${API_URL}/crafty-beers/${id}`);
      setFormData(data);
      setBeer(data);
    };
    fetchData();
  }, []);

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
      const { data } = await axios.put(
        `${API_URL}/crafty-beers/beer-id`,
        formData,
        requestConfig
      );
      setBeer(data);
      setSuccessMessage(`${formData.name} Beer has been succesfully updated`);
    } catch (e) {
      console.log(e);
      setShowError("Beer couldn't be updated");
    }
  };

  return (
    <div className="beerPage">
      <section className="info">
        <h1>Individual info for: {beer.name}</h1>
        <p>Description: {beer.description}</p>
        <p>Type: {beer.type}</p>
        <p>Strength: {beer.strength}</p>
      </section>
      <h3>Update beer</h3>
      <form onSubmit={onSubmit} className="addBeerForm">
        {successMessage && (
          <h5 className="alert alert--success">{successMessage}</h5>
        )}
        {showError && <h5 className="alert alert--error">{showError}</h5>}
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
      <Link to="/beers">
        <p className="backToBeers">
          Click here to go back to the beers section
        </p>
      </Link>
    </div>
  );
};

export default BeerPage;
