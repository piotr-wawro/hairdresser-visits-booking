import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const EditUser = () => {
  const navigate = useNavigate();
  return (
    <div
      id="editUserBox"
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
        id="editBox"
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
          id="editHeader"
          style={{
            marginTop: 30,
            textAlign: "center",
            fontSize: 30,
            fontStyle: "bold",
          }}
        >
          Profil:
        </label>
        <TextField
          id="editNameText"
          label="Podaj imię:"
          variant="outlined"
          style={{
            marginTop: 40,
            width: 500,
            background: "lightgrey",
          }}
        />

        <TextField
          id="editSecondNameText"
          label="Podaj nazwisko:"
          variant="outlined"
          style={{
            marginTop: 40,
            width: 500,
            background: "lightgrey",
          }}
        />

        <TextField
          id="editPhoneNumber"
          label="Podaj numer telefonu:"
          variant="outlined"
          style={{
            marginTop: 40,
            width: 500,
            background: "lightgrey",
          }}
        />

        <TextField
          id="editTextEmail2Text"
          label="Podaj adres e-mail:"
          variant="outlined"
          style={{
            marginTop: 40,
            width: 500,
            background: "lightgrey",
          }}
        />

        <div
          id="editButtons"
          style={{
            justifyContent: "center",
            height: 550,
            alignItems: "center",
          }}
        >
          <button
            id="editUserbutton"
            style={{
              marginTop: 30,
              justifyContent: "center",
              cursor: "pointer",
              height: 40,
              width: 200,
              fontSize: 15,
              backgroundColor: "lightgrey",
            }}
            onClick={() => navigate("/main-menu")}
          >
            Edytuj
          </button>
          <button
            id="cancelEditButton"
            style={{
              marginTop: 30,
              justifyContent: "center",
              cursor: "pointer",
              height: 40,
              width: 200,
              fontSize: 15,
              backgroundColor: "lightgrey",
              marginLeft: 80,
            }}
            onClick={() => navigate("/main-menu")}
          >
            Anuluj
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
