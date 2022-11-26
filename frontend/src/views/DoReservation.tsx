import { TextField, TextFieldProps } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DateTimePicker from "react-datetime-picker";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DoReservation = () => {
  const navigate = useNavigate();
  const Header1 = styled.h1`
    margin-top: 30px;
  `;
  const Header3 = styled.h3`
    margin-top: 30px;
    margin-bottom: 10px;
  `;

  const DoReservationBox = styled.div`
    margin-top: 50px;
    justify-content: center;
    height: 600px;
    align-items: center;
    background: #f5f5f5;
    flex-direction: column;
    text-align: center;
    display: flex;
    width: 80vw;
    margin-right: auto;
    margin-left: auto;
  `;

  const ReservationButtonBox = styled.div`
    justify-content: center;
    height: 550px;
    align-items: center;
    margin-top: 30px;
    display: flex;
    width: 80%;
  `;

  const DoReservationButton = styled.button`
    margin-top: 35px;
    justify-content: "center";
    cursor: pointer;
    height: 40px;
    font-size: 20px;
    background: lightgrey;
    width: 35%;
    max-width: 250px;
    margin-right: 20px;
  `;

  const EditReservationButton = styled.button`
    margin-top: 35px;
    justify-content: "center";
    cursor: pointer;
    height: 40px;
    font-size: 20px;
    background: lightgrey;
    width: 35%;
    max-width: 250px;
    margin-right: 20px;
  `;

  const CancelReservationButton = styled.button`
    margin-top: 35px;
    justify-content: "center";
    cursor: pointer;
    height: 40px;
    font-size: 20px;
    background: lightgrey;
    width: 35%;
    max-width: 250px;
  `;

  const TypeChoice = styled.datalist``;
  const TypeChoiceInput = styled.input`
    margin-top: 20px;
  `;

  const WorkerChoice = styled.datalist``;
  const WorkerChoiceInput = styled.input`
    margin-top: 20px;
  `;

  const TimeChoice = styled.datalist``;
  const TimeChoiceInput = styled.input`
    margin-top: 6px;
    width: 55px;
  `;
  const [startDate, setStartDate] = useState(new Date());

  return (
    <DoReservationBox>
      <Header1>Zarezerwuj termin!</Header1>
      <Header3>Data:</Header3>
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
      />
      <Header3>Godzina:</Header3>
      <TimeChoiceInput list="timeChoice"></TimeChoiceInput>
      <TimeChoice id="timeChoice">
        <option value="8:00"></option>
        <option value="9:00"></option>
        <option value="10:00"></option>
        <option value="11:00"></option>
        <option value="12:00"></option>
        <option value="13:00"></option>
        <option value="14:00"></option>
        <option value="15:00"></option>
        <option value="16:00"></option>
      </TimeChoice>
      <Header3>Typ wizyty:</Header3>
      <TypeChoiceInput list="typeChoice"></TypeChoiceInput>
      <TypeChoice id="typeChoice">
        <option value="Strzyżenie męskie"></option>
        <option value="Strzyżenie damskie"></option>
        <option value="Farbowanie"></option>
      </TypeChoice>
      <Header3>Pracownik:</Header3>
      <WorkerChoiceInput list="workerChoice"></WorkerChoiceInput>
      <WorkerChoice id="workerChoice">
        <option value="Pracownik nr.1"></option>
        <option value="Pracownik nr.2"></option>
        <option value="Pracownik nr.3"></option>
      </WorkerChoice>

      <ReservationButtonBox>
        <DoReservationButton onClick={() => navigate("/main-menu")}>
          Zapisz
        </DoReservationButton>
        <EditReservationButton onClick={() => navigate("/main-menu")}>
          Edytuj
        </EditReservationButton>
        <CancelReservationButton onClick={() => navigate("/main-menu")}>
          Usuń
        </CancelReservationButton>
      </ReservationButtonBox>
    </DoReservationBox>
  );
};

export default DoReservation;
