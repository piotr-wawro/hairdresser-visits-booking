import logo from "../assets/logo1.jpg";
import { useNavigate } from "react-router-dom";
import "../views/Style.css";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <img src={logo} id="logo" />

      <h1 className="booking"></h1>

      <button className="navbarbutton" onClick={() => navigate("/log-in")}>
        Logowanie
      </button>
    </div>
  );
}

export default Navbar;
