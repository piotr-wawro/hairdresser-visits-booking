//import Texfield from "./textfield.js";

import styled from "styled-components";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const navigate = useNavigate();

  const LoginBoxDiv = styled.div`
    margin-top: 50px;
    justify-content: center;
    height: 400px;
    align-items: center;
    background: #f5f5f5;
    flex-direction: column;
    text-align: center;
    display: flex;
  `;

  const LoginHeader = styled.label`
    textalign: center;
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 40px;
  `;

  const EmailTextField = styled(TextField)`
    background: lightgrey;
    margin-top: 40px;
    width: 500px;
  `;

  const AddMailUserButton = styled.button`
    margin-top: 35px;
    justifycontent: "center";
    cursor: pointer;
    height: 40px;
    width: 200px;
    fontsize: 20px;
    background: lightgrey;
  `;

  return (
    <LoginBoxDiv>
      <LoginHeader>Nowy użytkownik:</LoginHeader>

      <EmailTextField
        variant="outlined"
        label="Podaj e-mail..."
      ></EmailTextField>

      <AddMailUserButton onClick={() => navigate("/main-menu")}>
        Dodaj
      </AddMailUserButton>
    </LoginBoxDiv>
  );
};

export default LogIn;
