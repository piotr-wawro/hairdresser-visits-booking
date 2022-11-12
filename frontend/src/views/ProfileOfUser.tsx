import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const ProfileOfUser = () => {
  const navigate = useNavigate();

  const ProfileUserBox = styled.div`
    margin-top: 50px;
    justify-content: center;
    height: 600px;
    align-items: center;
    background: #f5f5f5;
    flex-direction: column;
    text-align: center;
    display: flex;
  `;

  const ProfileUserHeader = styled.label`
    textalign: center;
    font-size: 30px;
    font-weight: bold;
    margin-top: 40px;
    margin-bottom: 40px;
  `;

  const ProfileNameTextField = styled(TextField)`
    background: lightgrey;
    width: 500px;
    margin-top: 40px;
    padding: 0.25em 1em;
  `;

  const ProfileSurnameTextField = styled(TextField)`
    background: lightgrey;
    margin-top: 40px;
    width: 500px;
  `;

  const ProfilePhoneTextField = styled(TextField)`
    background: lightgrey;
    margin-top: 40px;
    width: 500px;
  `;

  const ProfileEmailTextField = styled(TextField)`
    background: lightgrey;
    margin-top: 40px;
    width: 500px;
  `;

  const ProfileButtonBox = styled.div`
    justifycontent: center;
    height: 550px;
    alignitems: center;
    margin-top: 30px;
  `;

  const ProfileUserCancelButton = styled.button`
    margin-top: 40px;
    justifycontent: "center";
    cursor: pointer;
    height: 40px;
    width: 200px;
    fontsize: 20px;
    background: lightgrey;
    font-weight: bold;
    margin-left: 40px;
  `;

  const ProfileUserApplyButton = styled.button`
    margin-top: 40px;
    justifycontent: "center";
    cursor: pointer;
    height: 40px;
    width: 200px;
    fontsize: 20px;
    background: lightgrey;
    font-weight: bold;
  `;
  return (
    <ProfileUserBox>
      <ProfileUserHeader>Profil:</ProfileUserHeader>
      <ProfileNameTextField
        label="Podaj imię:"
        variant="outlined"
      ></ProfileNameTextField>

      <ProfileSurnameTextField
        style={{ marginTop: 40 }}
        label="Podaj nazwisko:"
        variant="outlined"
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

export default ProfileOfUser;
