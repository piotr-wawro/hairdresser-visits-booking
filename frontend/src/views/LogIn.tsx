import { useState } from "react";
import styled from "styled-components";
import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLazyLogInQuery } from "../api/user.js";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const [logInQuery] = useLazyLogInQuery();

  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const onLogIn = () => {
    logInQuery({ email })
      .unwrap()
      .then(() => navigate("/"));
  };

  return (
    <LoginBoxDiv>
      <LoginHeader>Nowy użytkownik:</LoginHeader>

      <EmailTextField
        value={email}
        onChange={onEmailChange}
        variant="outlined"
        label="Podaj e-mail..."
      ></EmailTextField>

      <AddMailUserButton onClick={onLogIn}>Dodaj</AddMailUserButton>
    </LoginBoxDiv>
  );
};

export default LogIn;

const LoginBoxDiv = styled.div`
  margin-top: 50px;
  justify-content: center;
  height: 400px;
  align-items: center;
  background: #f5f5f5;
  flex-direction: column;
  text-align: center;
  display: flex;
  width: 75vw;
  margin-right: auto;
  margin-left: auto;
`;

const LoginHeader = styled.label`
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 40px;
`;

const EmailTextField = styled(TextField)`
  background: lightgrey;
  margin-top: 40px;
  width: 75%;
  margin-right: auto;
  margin-left: auto;
  max-width: 600px;
`;

const AddMailUserButton = styled.button`
  margin-top: 35px;
  justify-content: "center";
  cursor: pointer;
  height: 40px;
  width: 200px;
  font-size: 20px;
  background: lightgrey;
  width: 35%;
  max-width: 250px;
`;
