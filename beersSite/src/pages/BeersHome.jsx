import { Link } from "react-router-dom";

const BeersHome = () => {
  return (
    <div>
      <h1 className="welcome">
        Welcome to our beer gallery. Feel free to browse our beers or add your
        own!
      </h1>
      <Link to={"/beers"}>
        <button className="homeButton">Beers gallery</button>
      </Link>
      <Link to={"/beer-id"}>
        <button className="homeButton">Add your own beer</button>
      </Link>
    </div>
  );
};

export default BeersHome;
