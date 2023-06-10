import { useState, useEffect } from "react";
import axios from "axios";
import SeeMore from "../components/SeeMore";
import { API_URL } from "../consts";

const BeersPage = () => {
  const [beers, setBeers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/crafty-beers`);
        setBeers(data);
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="beersPage">
      <h1 className="beers">Beers</h1>
      <ul className="beersPageContainer">
        {beers.map((beer, ind) => (
          <SeeMore key={ind} beer={beer} />
        ))}
      </ul>
    </div>
  );
};

export default BeersPage;
