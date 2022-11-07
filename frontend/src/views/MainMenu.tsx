import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const MainMenu = () => {
  const navigate = useNavigate();
  return (
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
  );
};

export default MainMenu;
