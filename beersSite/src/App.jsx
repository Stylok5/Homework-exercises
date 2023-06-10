import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import BeersHome from "./pages/BeersHome";
import BeersPage from "./pages/BeersPage";
import BeerPage from "./pages/BeerPage";
import NotFound from "./pages/NotFound";
import "./styles/styling.scss";
import Footer from "./components/Footer";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AddBeerPage from "./pages/AddBeerPage";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<BeersHome />} />
        <Route path="/beers" element={<BeersPage />} />
        <Route path="/beers/:id" element={<BeerPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/beer-id" element={<AddBeerPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
