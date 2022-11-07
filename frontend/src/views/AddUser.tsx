import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();
  return (
    <div
      id="addUserBox"
      style={{
        height: "100%",
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/*
      <label
        id="loginheader"
        style={{
          textAlign: "center",
          fontSize: 30,
          fontStyle: "bold",
          background: "lightgrey",
          padding: 15,
          width: 40,
        }}
      >
        Rezerwacja miejsc:
      </label>
  */}

      <div
        id="login2box"
        style={{
          marginTop: 50,
          display: "flex",
          justifyContent: "center",
          height: 550,
          alignItems: "center", //
          backgroundColor: "#f5f5f5",
          flexDirection: "column",
        }}
      >
        <label
          id="login2header"
          style={{
            textAlign: "center",
            fontSize: 30,
            fontStyle: "bold",
          }}
        >
          Nowy użytkownik:
        </label>
        <TextField
          id="nameText"
          label="Podaj imię:"
          variant="outlined"
          style={{
            marginTop: 40,
            width: 500,
            background: "lightgrey",
          }}
        />

        <TextField
          id="secondNameText"
          label="Podaj nazwisko:"
          variant="outlined"
          style={{
            marginTop: 40,
            width: 500,
            background: "lightgrey",
          }}
        />

        <TextField
          id="phoneNumber"
          label="Podaj numer telefonu:"
          variant="outlined"
          style={{
            marginTop: 40,
            width: 500,
            background: "lightgrey",
          }}
        />

        <TextField
          id="textEmail2Text"
          label="Podaj adres e-mail:"
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

export default AddUser;
