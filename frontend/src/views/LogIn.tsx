//import Texfield from "./textfield.js";

import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();
  return (
    <div
      id="LoginBox"
      style={{
        height: "100%",
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        id="loginbox"
        style={{
          marginTop: 50,
          display: "flex",
          justifyContent: "center",
          height: 400,
          alignItems: "center", //
          backgroundColor: "#f5f5f5",
          flexDirection: "column",
        }}
      >
        <label
          id="loginheader"
          style={{
            textAlign: "center",
            fontSize: 30,
            fontStyle: "bold",
          }}
        >
          Nowy użytkownik:
        </label>
        <TextField
          id="filled-basic"
          label="Podaj e-mail:"
          variant="outlined"
          style={{
            marginTop: 40,
            width: 500,
            background: "lightgrey",
          }}
        />

        <button
          id="adduserbutton"
          style={{
            marginTop: 30,
            justifyContent: "center",
            cursor: "pointer",
            height: 50,
            width: 300,
            fontSize: 20,
            backgroundColor: "lightgrey",
          }}
          onClick={() => navigate("/main-menu")}
        >
          Dodaj
        </button>
      </div>
    </div>
  );
};

export default LogIn;
