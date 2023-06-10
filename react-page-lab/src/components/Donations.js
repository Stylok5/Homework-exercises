import { Fragment } from "react";

const donorData = {
  contact: {
    email: "development@metmuseum.org",
    phone: "212-650-2425",
  },
  amounts: [50, 100, 250, 500, 1000, 5000],
};

function Donations() {
  return (
    <Fragment>
      {donorData.amounts.map((amount) => (
        <ul key={amount}>
          <li className="amounts" key={amount}>
            ${amount}
          </li>
        </ul>
      ))}
    </Fragment>
  );
}
export default Donations;
