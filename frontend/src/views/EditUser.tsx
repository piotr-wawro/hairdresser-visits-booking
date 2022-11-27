import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import {
  useLazyPatchUserProfileQuery,
  useUserProfileQuery,
} from "../api/user.js";

const EditUserBox = styled.div`
  margin-top: 50px;
  justify-content: center;
  height: 60vh;
  align-items: center;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 75vw;
  margin-right: auto;
  margin-left: auto;
`;

const EditUserHeader = styled.label`
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  margin-top: 40px;
  margin-bottom: 40px;
`;

const EditNameTextField = styled(TextField)`
  background: lightgrey;
  width: 75%;
  margin-right: auto;
  margin-left: auto;
  max-width: 600px;
  margin-top: 40px;
  padding: 0.25em 1em;
`;

const EditSurnameTextField = styled(TextField)`
  background: lightgrey;
  margin-top: 40px;
  width: 75%;
  margin-right: auto;
  margin-left: auto;
  max-width: 600px;
`;

const EditPhoneTextField = styled(TextField)`
  background: lightgrey;
  margin-top: 40px;
  width: 75%;
  margin-right: auto;
  margin-left: auto;
  max-width: 600px;
`;

const EditEmailTextField = styled(TextField)`
  background: lightgrey;
  margin-top: 40px;
  width: 75%;
  margin-right: auto;
  margin-left: auto;
  max-width: 600px;
`;

const EditButtonBox = styled.div`
  justify-content: center;
  height: 550px;
  align-items: center;
  margn-top: 30px;
  display: flex;
  width: 80%;
`;
const EditUserCancelButton = styled.button`
  margin-top: 40px;
  justify-content: "center";
  cursor: pointer;
  height: 40px;
  width: 200px;
  font-size: 20px;
  background: lightgrey;
  font-weight: bold;
  margin-left: 40px;
`;

const EditUserApplyButton = styled.button`
  margin-top: 40px;
  justify-content: "center";
  cursor: pointer;
  height: 40px;
  width: 200px;
  font-size: 20px;
  background: lightgrey;
  font-weight: bold;
`;

const EditUser = () => {
  const navigate = useNavigate();

  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userNumber, setUserNumber] = useState("");
  //const [userMail, setUserMail] = useState("");
  const { data } = useUserProfileQuery();

  useEffect(() => {
    if (data) {
      setUserFirstName(data.firstName);
      setUserLastName(data.lastName);
      setUserNumber(data.phoneNumber);
    }
  }, [data]);

  //console.log(userFirstName, userLastName, userNumber);
  const [usePatchUserVisitInfoQuery, { status }] =
    useLazyPatchUserProfileQuery();
  const onSave = async () => {
    try {
      const payload = await usePatchUserVisitInfoQuery({
        firstName: userFirstName,
        lastName: userLastName,
        phoneNumber: userNumber,
        // email: userMail,
      }).unwrap();
      navigate("/main-menu");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <EditUserBox>
      <EditUserHeader>Edytuj informacje</EditUserHeader>

      <EditNameTextField
        value={userFirstName}
        label="Zmień imię:"
        variant="outlined"
        onChange={(element) => {
          setUserFirstName(element.target.value);
        }}
      ></EditNameTextField>

      <EditSurnameTextField
        value={userLastName}
        style={{ marginTop: 40 }}
        label="Zmień nazwisko:"
        variant="outlined"
        onChange={(element) => {
          setUserLastName(element.target.value);
        }}
      ></EditSurnameTextField>

      <EditPhoneTextField
        value={userNumber}
        style={{ marginTop: 40 }}
        label="Zmień numer telefonu:"
        variant="outlined"
        onChange={(element) => {
          setUserNumber(element.target.value);
        }}
      ></EditPhoneTextField>

      {/* <EditEmailTextField
        style={{ marginTop: 40 }}
        label="Zmień e-mail:"
        variant="outlined"
        onChange={(element) => {
          setUserMail(element.target.value);
        }}
      ></EditEmailTextField>*/}

      <EditButtonBox>
        <EditUserApplyButton onClick={() => onSave()}>
          Edytuj
        </EditUserApplyButton>
        <EditUserCancelButton onClick={() => navigate("/main-menu")}>
          Anuluj
        </EditUserCancelButton>
      </EditButtonBox>
    </EditUserBox>
  );
};

export default EditUser;
