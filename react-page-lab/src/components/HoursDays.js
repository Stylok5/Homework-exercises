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

function HoursDays() {
  return (
    <Fragment>
      {infoData.hours.map((hour) => (
        <ul key={hour.day}>
          <li className="hours" key={hour.day}>
            {hour.day}:
            <span className="times" key={hour.times}>
              {hour.times}
            </span>
          </li>
        </ul>
      ))}
    </Fragment>
  );
}
export default HoursDays;
