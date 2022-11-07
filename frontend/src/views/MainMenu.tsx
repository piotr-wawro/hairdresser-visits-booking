import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MainBox from "../components/MainBox.js";
import background from "../assets/background.jpg";
import graphic1 from "../assets/graphic1.jpg";
import graphic2 from "../assets/graphic2.jpg";
import graphic3 from "../assets/graphic3.jpg";
import "./Style.css";
import logo from "../assets/logo1.jpg";

const MainMenu = () => {
  const navigate = useNavigate();
  return (
    <div className="Container">
      <div className="navbar">
        <img src={logo} id="logo" />

        <h1 className="booking">Zapisz się do fryzjera już dziś!</h1>

        <button
          className="navbarbutton"
          onClick={() => navigate("/profile-user")}
        >
          Profil
        </button>
      </div>

      <div className="card">
        <label
          id="dodajLabel"
          style={{
            textAlign: "center",
            display: "flex",
            fontSize: 30,
            fontStyle: "bold",
            color: "white",
            marginLeft: 80,
          }}
        >
          Dodaj pracowników:
        </label>

        <label
          id="edytujLabel"
          style={{
            textAlign: "center",
            display: "flex",
            fontSize: 30,
            fontStyle: "bold",
            color: "white",
            marginLeft: 220,
          }}
        >
          Edytuj pracowników:
        </label>

        <button
          id="addWorkerButton"
          style={{
            cursor: "pointer",
            height: 40,
            width: 200,
            fontSize: 15,
            backgroundColor: "lightgrey",
            marginLeft: 80,
          }}
          onClick={() => navigate("/add-user")}
        >
          Dodaj pracownika
        </button>

        <button
          id="editWorkerButton"
          style={{
            cursor: "pointer",
            height: 40,
            width: 200,
            fontSize: 15,
            backgroundColor: "lightgrey",
            marginLeft: 80,
          }}
          onClick={() => navigate("/edit-user")}
        >
          Edytuj pracownika
        </button>
      </div>
    </div>
  );
};

export default MainMenu;
