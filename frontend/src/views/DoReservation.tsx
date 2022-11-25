import { TextField, TextFieldProps } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DateTimePicker from "react-datetime-picker";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLazyPostVisitQuery } from "../api/visit.js";

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

const TypeChoice = styled.select``;
const TypeChoiceInput = styled.input`
  margin-top: 20px;
`;

const WorkerChoice = styled.select``;
const WorkerChoiceInput = styled.input`
  margin-top: 20px;
`;

const TimeChoice = styled.select``;
const TimeChoiceInput = styled.input`
  margin-top: 6px;
  width: 55px;
`;

const DoReservation = () => {
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(new Date());
  const [timeChoice, setTimeChoice] = useState("");
  const [typeChoice, setTypeChoice] = useState("");
  const [workerChoice, setWorkerChoice] = useState("");

  const [postVisitQuery, { status }] = useLazyPostVisitQuery();

  console.log(workerChoice);

  const onSave = async () => {
    try {
      const payload = await postVisitQuery({
        servicedBy: workerChoice,
        start: new Date(
          startDate.toISOString().split("T")[0] + " " + timeChoice + ":00"
        ).toISOString(),
        type: typeChoice,
      }).unwrap();
      navigate("/main-menu");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DoReservationBox>
      <Header1>Zarezerwuj termin!</Header1>
      <Header3>Data:</Header3>
      <DatePicker
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
      />
      <Header3>Godzina:</Header3>
      <TimeChoice
        id="timeChoice"
        value={timeChoice}
        onChange={(element) => {
          setTimeChoice(element.target.value);
        }}
      >
        <option value=""></option>
        <option value="08:00">08:00</option>
        <option value="09:00">09:00</option>
        <option value="10:00">10:00</option>
        <option value="11:00">11:00</option>
        <option value="12:00">12:00</option>
        <option value="13:00">13:00</option>
        <option value="14:00">14:00</option>
        <option value="15:00">15:00</option>
        <option value="16:00">16:00</option>
      </TimeChoice>
      <Header3>Rodzaj usługi:</Header3>
      <TypeChoice
        id="typeChoice"
        value={typeChoice}
        onChange={(element) => {
          setTypeChoice(element.target.value);
        }}
      >
        <option value=""></option>
        <option value="haircut">Strzyżenie męskie</option>
        <option value="Strzyżenie damskie">Strzyżenie damskie</option>
        <option value="Farbowanie">Farbowanie</option>
      </TypeChoice>
      <Header3>Pracownik:</Header3>
      <WorkerChoice
        id="workerChoice"
        value={workerChoice}
        onChange={(element) => {
          setWorkerChoice(element.target.value);
        }}
      >
        <option value=""></option>
        <option value="634dc798-9608-405e-8e95-94095d91fb73">
          Pracownik nr.1
        </option>
        <option value="Pracownik nr.2">Pracownik nr.2</option>
        <option value="Pracownik nr.3">Pracownik nr.3</option>
      </WorkerChoice>

      <ReservationButtonBox>
        <DoReservationButton onClick={() => onSave()}>
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
