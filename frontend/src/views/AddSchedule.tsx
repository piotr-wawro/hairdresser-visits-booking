import { Grid, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MainBox from "../components/MainBox.js";
import background from "../assets/background.jpg";
import graphic1 from "../assets/graphic1.jpg";
import graphic2 from "../assets/graphic2.jpg";
import graphic3 from "../assets/graphic3.jpg";
import logo from "../assets/logo1.jpg";
import styled from "styled-components";
import DateTimePicker from "react-datetime-picker";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGetEmployeeQuery, useAllEmployeesQuery } from "../api/employee.js";
import { useLazyAllVisitsQuery } from "../api/visit.js";
import { useLazyGetAllSchedulesQuery } from "../api/schedule.js";
import Schedule from "../components/Schedule.js";
import { useUserProfileQuery } from "../api/user.js";

const Header1 = styled.h1``;

const Header2 = styled.h2`
  color: white;
  width: 300px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: auto;
  margin-right: auto;
  width: max-content;
  width: 100%;
`;

const Navbar = styled.div`
  background: #47a8bd;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
  margin-top: 0px;

  text-align: center;
  padding: 25px 0 15px 0;
  width: 100%;
`;

const Logo = styled.img`
  height: 80px;
  width: 80px;
  padding-left: 10px;
`;

const NavbarButton = styled.button`
  width: 250px;
  height: 81px;
  left: 1111px;
  top: 34px;
  background: #ff9b71;
  border-radius: 20px;
  margin-right: 50px;
  font-size: 32px;
`;

const Card = styled.div`
  margin-top: 50px;
  background-color: #17567c;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64px;
  gap: 40px;
  width: 70vw;
  height: 60vh;
  margin-left: auto;
  margin-right: auto;
  justify-content: center;
`;
const MainMenuButtonBox = styled.div`
  justify-content: center;
  height: 50px;
  display: flex;
  width: 80%;
  gap: 10%;
  margin-top: 50px;
  margin-right: auto;
  margin-left: auto;
`;

const MainMenuAddWorkerButton = styled.button`
  margin-top: 40px;
  justify-content: "center";
  cursor: pointer;
  height: 40px;
  width: 250px;
  font-size: 20px;
  background: lightgrey;
  font-weight: bold;
  text-align: center;
`;

const MainMenuEditWorkerButton = styled.button`
  margin-top: 40px;
  justify-content: "center";
  cursor: pointer;
  height: 40px;
  width: 250px;
  font-size: 20px;
  background: lightgrey;
  font-weight: bold;
  text-align: center;
`;

const DoReservationButton = styled.button`
  margin-top: 40px;
  justify-content: "center";
  cursor: pointer;
  height: 40px;
  width: 250px;
  font-size: 20px;
  background: lightgrey;
  font-weight: bold;
  text-align: center;
`;

const ImageHolder = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  gap: 40px;
`;

const DateOfReservationBox = styled.div`
  justify-content: center;
  height: 50px;
  margin-top: 5px;
  display: flex;
  width: 80%;
  gap: 10%;
  margin-right: auto;
  margin-left: auto;
`;

const DivsReserved = styled.div`
  background: white;
  padding: 10px;
  width: 80px;
  height: 50px;
`;

const HoursLabel = styled.label``;
const WorkerChoice = styled.select``;

const AddSchedule = () => {
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(new Date());

  const { data: profile } = useUserProfileQuery();
  const { data: employees } = useAllEmployeesQuery();

  const [allVisitsQuery, { data: visits }] = useLazyAllVisitsQuery();

  const [allSchedulesQuery, { data: schedules }] =
    useLazyGetAllSchedulesQuery();

  const [workerChoice, setWorkerChoice] = useState("");
  const [time, setTime] = useState<Date | undefined>(undefined);
  const [selectedVisit, setSelectedVisit] = useState("");

  useEffect(() => {
    allVisitsQuery({
      start: startDate.toISOString().split("T")[0] + "T08:00:00.000Z",
      end: startDate.toISOString().split("T")[0] + "T23:59:00.000Z",
    });
    allSchedulesQuery({
      start: startDate.toISOString().split("T")[0] + "T08:00:00.000Z",
      end: startDate.toISOString().split("T")[0] + "T23:59:00.000Z",
    });
    //console.log(visits?.filter(visits => visits.servicedById === workerChoice));
    //console.log(visits.filter(visits => visits.id === workerChoice))
  }, [startDate]);

  return (
    <Container>
      <Navbar>
        <Logo src={logo}></Logo>
        <Header1>Ekran managera:</Header1>

        <NavbarButton onClick={() => navigate("/edit-user")}>
          Profil
        </NavbarButton>
      </Navbar>

      <Card>
        <DateOfReservationBox>
          <Header2>Wybierz datę:</Header2>
          <DatePicker
            selected={startDate}
            onChange={(date: Date) => setStartDate(date)}
          />
          <Header2>Wybierz pracownika:</Header2>
          <WorkerChoice
            id="workerChoice"
            value={workerChoice}
            onChange={(element) => {
              setWorkerChoice(element.target.value);
            }}
          >
            {employees?.map((e, i) => {
              return (
                <option key={i} value={e.id}>
                  {e.firstName} {e.lastName}
                </option>
              );
            })}
          </WorkerChoice>
        </DateOfReservationBox>

        <Schedule
          schedule={schedules?.filter((e) => e.forId === workerChoice)}
          visits={visits?.filter((e) => e.servicedById === workerChoice)}
          userId={profile?.id}
          time={time}
          setTime={setTime}
          selectedVisit={selectedVisit}
          setSelectedVisit={setSelectedVisit}
        />

        <MainMenuButtonBox>
          <MainMenuAddWorkerButton onClick={() => navigate("/add-user")}>
            Dodaj pracownika
          </MainMenuAddWorkerButton>

          {/*<MainMenuEditWorkerButton onClick={() => navigate("/edit-user")}>
            Edytuj pracownika
          </MainMenuEditWorkerButton>*/}
        </MainMenuButtonBox>
      </Card>
    </Container>
  );
};

export default AddSchedule;