import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import React, { useState } from "react";
import { useLazyPostUserVisitDataQuery } from "../api/user.js";
const AddUserBox = styled.div`
  margin-top: 50px;
  justify-content: center;
  height: 600px;
  align-items: center;
  background: #f5f5f5;
  flex-direction: column;
  text-align: center;
  display: flex;
`;

const AddUserHeader = styled.label`
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 40px;
`;

const AddNameTextField = styled(TextField)`
  background: lightgrey;
  width: 500px;
  margin-top: 40px;
  padding: 0.25em 1em;
`;

const AddSurnameTextField = styled(TextField)`
  background: lightgrey;
  margin-top: 40px;
  width: 500px;
`;

const AddPhoneTextField = styled(TextField)`
  background: lightgrey;
  margin-top: 40px;
  width: 500px;
`;

const AddEmailTextField = styled(TextField)`
  background: lightgrey;
  margin-top: 40px;
  width: 500px;
`;

const AddUserButton = styled.button`
  margin-top: 40px;
  justify-content: "center";
  cursor: pointer;
  height: 40px;
  width: 200px;
  font-size: 20px;
  background: lightgrey;
  font-weight: bold;
`;

const AddUser = () => {
  const navigate = useNavigate();
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const [userMail, setUserMail] = useState("");

  const [usePostUserVisitDataQuery, { status }] =
    useLazyPostUserVisitDataQuery();

  console.log(userFirstName, userLastName, userNumber, userMail);

  const onSave = async () => {
    try {
      const payload = await usePostUserVisitDataQuery({
        firstName: userFirstName,
        lastName: userLastName,
        email: userMail,
        phoneNumber: userNumber,
      }).unwrap();
      navigate("/main-menu");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AddUserBox>
      <AddUserHeader>Nowy użytkownik:</AddUserHeader>
      <AddNameTextField
        style={{ marginBottom: 40 }}
        label="Podaj imię:"
        variant="outlined"
        onChange={(element) => {
          setUserFirstName(element.target.value);
        }}
      ></AddNameTextField>

      <AddSurnameTextField
        style={{ marginBottom: 40 }}
        label="Podaj nazwisko:"
        variant="outlined"
        onChange={(element) => {
          setUserLastName(element.target.value);
        }}
      ></AddSurnameTextField>

      <AddPhoneTextField
        style={{ marginBottom: 40 }}
        label="Podaj numer telefonu:"
        variant="outlined"
        onChange={(element) => {
          setUserNumber(element.target.value);
        }}
      ></AddPhoneTextField>

      <AddEmailTextField
        style={{ marginTop: 40 }}
        label="Zmień e-mail:"
        variant="outlined"
        onChange={(element) => {
          setUserMail(element.target.value);
        }}
      ></AddEmailTextField>

      <AddUserButton onClick={() => onSave()}>Dodaj</AddUserButton>
    </AddUserBox>
  );
};

export default AddUser;
