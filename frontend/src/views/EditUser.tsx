import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const EditUser = () => {
  const navigate = useNavigate();

  const EditUserBox = styled.div`
    margin-top: 50px;
    justify-content: center;
    height: 600px;
    align-items: center;
    background: #f5f5f5;
    flex-direction: column;
    text-align: center;
    display: flex;
  `;

  const EditUserHeader = styled.label`
    textalign: center;
    font-size: 30px;
    font-weight: bold;
    margin-top: 40px;
    margin-bottom: 40px;
  `;

  const EditNameTextField = styled(TextField)`
    background: lightgrey;
    width: 500px;
    margin-top: 40px;
    padding: 0.25em 1em;
  `;

  const EditSurnameTextField = styled(TextField)`
    background: lightgrey;
    margin-top: 40px;
    width: 500px;
  `;

  const EditPhoneTextField = styled(TextField)`
    background: lightgrey;
    margin-top: 40px;
    width: 500px;
  `;

  const EditEmailTextField = styled(TextField)`
    background: lightgrey;
    margin-top: 40px;
    width: 500px;
  `;

  const EditButtonBox = styled.div`
    justifycontent: center;
    height: 550px;
    alignitems: center;
    margn-top: 30px;
  `;
  const EditUserCancelButton = styled.button`
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

  const EditUserApplyButton = styled.button`
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
    <EditUserBox>
      <EditUserHeader>Edytuj użytkownika:</EditUserHeader>

      <EditNameTextField
        label="Zmień imię:"
        variant="outlined"
      ></EditNameTextField>

      <EditSurnameTextField
        style={{ marginTop: 40 }}
        label="Zmień nazwisko:"
        variant="outlined"
      ></EditSurnameTextField>

      <EditPhoneTextField
        style={{ marginTop: 40 }}
        label="Zmień numer telefonu:"
        variant="outlined"
      ></EditPhoneTextField>

      <EditEmailTextField
        style={{ marginTop: 40 }}
        label="Zmień e-mail:"
        variant="outlined"
      ></EditEmailTextField>

      <EditButtonBox>
        <EditUserApplyButton onClick={() => navigate("/main-menu")}>
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
