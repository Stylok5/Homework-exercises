import { Fragment } from "react";

const donorData = {
  contact: {
    email: "development@metmuseum.org",
    phone: "212-650-2425",
  },
  amounts: [50, 100, 250, 500, 1000, 5000],
};

function ContactInfo() {
  return (
    <Fragment>
      <ul className="donorData">
        <li className="mail" key={donorData.contact.email}>
          <a href={`mailto:${donorData.contact.email}`}>
            {donorData.contact.email}
          </a>
        </li>
        <li className="phone" key={donorData.contact.phone}>
          {donorData.contact.phone}
        </li>
      </ul>
    </Fragment>
  );
}
export default ContactInfo;
