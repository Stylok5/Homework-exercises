import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./styles/main.scss";

function App() {
  const [tapas, setTapas] = useState([]);
  const [error, setError] = useState(null);
  const [timestamp, setTimestamp] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          "https://api.tfl.gov.uk/line/mode/tube/status"
        );
        setTapas(data);
        setError(null);
        setTimestamp(Date.now());
        console.log({ data });
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
    const intervalId = setInterval(fetchData, 3000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="all">
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <>
          <h1>Tube Status</h1>
          <section>
            <p className="update">
              Data last updated:{" "}
              {timestamp && new Date(timestamp).toLocaleString()}
            </p>
            {tapas === 0 && !error ? (
              <h3>Loading</h3>
            ) : (
              tapas.map((tapa) => {
                return (
                  <ul key={tapa.id} className="lines">
                    <li className="name">{tapa.name}</li>
                    <li className="status">
                      {tapa.lineStatuses.map((service) => {
                        return service.statusSeverityDescription;
                      })}
                    </li>
                    <p className="borderLine"></p>
                  </ul>
                );
              })
            )}
          </section>
        </>
      )}
    </div>
  );
}

export default App;
