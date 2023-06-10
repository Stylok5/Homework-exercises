import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h2>Page was not found</h2>
      <Link to="/">Click here to go back to the home page</Link>
    </div>
  );
};

export default NotFound;
