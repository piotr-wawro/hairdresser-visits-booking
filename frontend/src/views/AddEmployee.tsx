import { Alert, Snackbar, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import React, { forwardRef, useState } from "react";
import { usePostEmployeeMutation } from "../api/employee.js";
import { handleBreakpoints } from "@mui/system";
import { error } from "console";
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

const AddEmployee = () => {
  const navigate = useNavigate();
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const [userMail, setUserMail] = useState("");

  const [usePostEmployeeQuery, { status }] = usePostEmployeeMutation();

  console.log(userFirstName, userLastName, userNumber, userMail);

  const [isFaultMail, setIsFaultMail] = useState(false);
  const [isDataGood, setIsDatGood] = useState(true);

  const onSave = async () => {
    try {
      if (
        userFirstName == "" ||
        userLastName == "" ||
        userNumber == "" ||
        userMail == ""
      ) {
        alert("Błąd wypełniania danych");
      } else {
        if (!userNumber.match("[0-9]{9}")) {
          alert("Nieprawidłowe wypełnienie telefonu");
        } else {
          const payload = await usePostEmployeeQuery({
            firstName: userFirstName,
            lastName: userLastName,
            email: userMail,
            phoneNumber: userNumber,
          }).unwrap();

          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);

      setIsFaultMail(true);
    }
  };

  return (
    <AddUserBox>
      <AddUserHeader>Nowy pracownik:</AddUserHeader>
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
        label="Podaj e-mail:"
        variant="outlined"
        onChange={(element) => {
          setUserMail(element.target.value);
        }}
      ></AddEmailTextField>

      <Snackbar
        open={isFaultMail}
        autoHideDuration={6000}
        onClose={() => setIsFaultMail(false)}
      >
        <Alert severity="error">Podano nieprawidłową formę maila</Alert>
      </Snackbar>

      <AddUserButton onClick={() => onSave()}>Dodaj</AddUserButton>
    </AddUserBox>
  );
};

export default AddEmployee;
