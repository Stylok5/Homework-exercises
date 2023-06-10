import { Link } from "react-router-dom";

const SeeMore = ({ beer }) => {
  return (
    <li className="beerCard">
      <div className="beerCardInfo">
        <h4>{beer.name}</h4>
        <img src={beer.image} alt="" className="beerCardImage" />
        <Link to={`/beers/${beer._id}`}>
          <button className="beerCardButton">See more</button>
        </Link>
      </div>
    </li>
  );
};
export default SeeMore;
