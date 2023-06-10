import image from "./assets/hero.jpg";
import "./styles/main.scss";
import TitleSubtitle from "./components/TitleSubtitle";
import HoursDays from "./components/HoursDays";
import TypesAmount from "./components/TypesAmount";
import ContactInfo from "./components/ContactInfo";
import Donations from "./components/Donations";

function App() {
  return (
    <main>
      <h1>The Metropolitan Museum of Art</h1>
      <hr />
      <section>
        <h2>Exhibit:</h2>
        <img src={image} alt="logo" />
        <TitleSubtitle />
        <p className="borderLine1"></p>
        <h1>General Info:</h1>
        <h3>Hours:</h3>
      </section>
      <HoursDays />
      <TypesAmount />
      <p className="borderLine2"></p>
      <h1>Donor Information</h1>
      <h3>Contact:</h3>
      <ContactInfo />
      <h3>Donation Amounts:</h3>
      <Donations />
    </main>
  );
}

export default App;
