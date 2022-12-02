import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import React, { useState } from "react";

const ProfileUserBox = styled.div`
  margin-top: 50px;
  justify-content: center;
  height: 600px;
  align-items: center;
  background: #f5f5f5;
  flex-direction: column;
  text-align: center;
  display: flex;
  width: 75vw;
  margin-right: auto;
  margin-left: auto;
`;

const ProfileUserHeader = styled.label`
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  margin-top: 40px;
  margin-bottom: 40px;
`;

const ProfileNameTextField = styled(TextField)`
  background: lightgrey;
  margin-top: 40px;
  padding: 0.25em 1em;
  width: 75%;
  margin-right: auto;
  margin-left: auto;
  max-width: 600px;
`;

const ProfileSurnameTextField = styled(TextField)`
  background: lightgrey;
  margin-top: 40px;
  width: 75%;
  margin-right: auto;
  margin-left: auto;
  max-width: 600px;
`;

const ProfilePhoneTextField = styled(TextField)`
  background: lightgrey;
  margin-top: 40px;
  width: 75%;
  margin-right: auto;
  margin-left: auto;
  max-width: 600px;
`;

const ProfileEmailTextField = styled(TextField)`
  background: lightgrey;
  margin-top: 40px;
  width: 75%;
  margin-right: auto;
  margin-left: auto;
  max-width: 600px;
`;

const ProfileButtonBox = styled.div`
  justify-content: center;
  height: 550px;
  align-items: center;
  margin-top: 30px;
  display: flex;
  width: 80%;
`;

const ProfileUserCancelButton = styled.button`
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

const ProfileUserApplyButton = styled.button`
  margin-top: 40px;
  justify-content: "center";
  cursor: pointer;
  height: 40px;
  width: 200px;
  font-size: 20px;
  background: lightgrey;
  font-weight: bold;
`;

const Profile = () => {
  const navigate = useNavigate();
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userNumber, setUserNumber] = useState("");
  const [userMail, setUserMail] = useState("");

  return (
    <ProfileUserBox>
      <ProfileUserHeader>Profil:</ProfileUserHeader>
      <ProfileNameTextField
        label="Podaj imię:"
        variant="outlined"
        onChange={(element) => {
          setUserFirstName(element.target.value);
        }}
      ></ProfileNameTextField>

      <ProfileSurnameTextField
        style={{ marginTop: 40 }}
        label="Podaj nazwisko:"
        variant="outlined"
        onChange={(element) => {
          setUserLastName(element.target.value);
        }}
      ></ProfileSurnameTextField>

      <ProfilePhoneTextField
        style={{ marginTop: 40 }}
        label="Podaj numer telefonu:"
        variant="outlined"
      ></ProfilePhoneTextField>

      <ProfileEmailTextField
        style={{ marginTop: 40 }}
        label="Podaj e-mail:"
        variant="outlined"
      ></ProfileEmailTextField>

      <ProfileButtonBox>
        <ProfileUserApplyButton onClick={() => navigate("/main-menu")}>
          Edytuj
        </ProfileUserApplyButton>
        <ProfileUserCancelButton onClick={() => navigate("/main-menu")}>
          Anuluj
        </ProfileUserCancelButton>
      </ProfileButtonBox>
    </ProfileUserBox>
  );
};

export default Profile;
