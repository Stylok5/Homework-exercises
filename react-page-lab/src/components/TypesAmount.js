import { Fragment } from "react";

const infoData = {
  hours: [
    { day: "Monday", times: "10.00am - 5.50pm" },
    { day: "Tuesday", times: "10.00am - 5.30pm" },
    { day: "Wednesday", times: "10.00am - 5.30pm" },
    { day: "Thursday", times: "10.00am - 5.30pm" },
    { day: "Friday", times: "10.00am - 9.00pm" },
    { day: "Saturday", times: "10.00am - 9.00pm" },
    { day: "Sunday", times: "10.00am - 5.30pm" },
  ],
  admissions: [
    { type: "Adults", amount: 25 },
    { type: "Seniors", amount: 17 },
    { type: "Students", amount: 12 },
  ],
};

function TypesAmount() {
  return (
    <Fragment>
      <h3 className="admissionTitle">Suggested Admission:</h3>
      {infoData.admissions.map((admission) => (
        <ul key={admission.type}>
          <li className="admission" key={admission.type}>
            {admission.type}
            <span key={admission.amount}> - ${admission.amount}</span>
          </li>
        </ul>
      ))}
    </Fragment>
  );
}

export default TypesAmount;
