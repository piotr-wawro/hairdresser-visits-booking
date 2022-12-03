import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import {
  useLazyPatchUserProfileQuery,
  useUserProfileQuery,
} from "../api/user.js";

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
  const { data } = useUserProfileQuery();

  useEffect(() => {
    if (data) {
      setUserFirstName(data.firstName);
      setUserLastName(data.lastName);
      setUserNumber(data.phoneNumber);
    }
  }, [data]);

  const [usePatchUserVisitInfoQuery, { status }] =
    useLazyPatchUserProfileQuery();

  const onSave = async () => {
    try {
      const payload = await usePatchUserVisitInfoQuery({
        firstName: userFirstName,
        lastName: userLastName,
        phoneNumber: userNumber,
        //email: userMail,
      }).unwrap();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProfileUserBox>
      <ProfileUserHeader>Profil:</ProfileUserHeader>
      <ProfileNameTextField
        value={userFirstName}
        label="Podaj imię:"
        variant="outlined"
        onChange={(element) => {
          setUserFirstName(element.target.value);
        }}
      ></ProfileNameTextField>

      <ProfileSurnameTextField
        style={{ marginTop: 40 }}
        value={userLastName}
        label="Podaj nazwisko:"
        variant="outlined"
        onChange={(element) => {
          setUserLastName(element.target.value);
        }}
      ></ProfileSurnameTextField>

      <ProfilePhoneTextField
        style={{ marginTop: 40 }}
        value={userNumber}
        label="Podaj numer telefonu:"
        variant="outlined"
        onChange={(element) => {
          setUserNumber(element.target.value);
        }}
      ></ProfilePhoneTextField>

      {/* <ProfileEmailTextField
        style={{ marginTop: 40 }}
        label="Podaj e-mail:"
        variant="outlined"
        onChange={(element) => {
          setUserMail(element.target.value);
        }}
      ></ProfileEmailTextField>*/}

      <ProfileButtonBox>
        <ProfileUserApplyButton onClick={() => onSave()}>
          Edytuj
        </ProfileUserApplyButton>
        <ProfileUserCancelButton onClick={() => navigate("/")}>
          Anuluj
        </ProfileUserCancelButton>
      </ProfileButtonBox>
    </ProfileUserBox>
  );
};

export default Profile;
