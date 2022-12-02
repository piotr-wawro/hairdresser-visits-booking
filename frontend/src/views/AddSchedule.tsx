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
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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

const AddSchedule = () => {
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(new Date());

  return (
    <Container>
      <Navbar>
        <Logo src={logo}></Logo>
        <Header1>Zapisz się do fryzjera już dziś!</Header1>

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
        </DateOfReservationBox>
        <Grid
          container
          spacing={1}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item>
            <DivsReserved>
              <HoursLabel onClick={() => navigate("/edit-reservation")}>
                Godzina: 8:00-9:00
              </HoursLabel>
            </DivsReserved>
          </Grid>
          <Grid item>
            <DivsReserved>
              <HoursLabel onClick={() => navigate("/edit-reservation")}>
                Godzina: 9:00-10:00
              </HoursLabel>
            </DivsReserved>
          </Grid>
          <Grid item>
            <DivsReserved>
              <HoursLabel onClick={() => navigate("/edit-reservation")}>
                Godzina: 10:00-11:00
              </HoursLabel>
            </DivsReserved>
          </Grid>
          <Grid item>
            <DivsReserved>
              <HoursLabel onClick={() => navigate("/edit-reservation")}>
                Godzina: 11:00-12:00
              </HoursLabel>
            </DivsReserved>
          </Grid>
          <Grid item>
            <DivsReserved style={{ background: "red" }}>
              <HoursLabel onClick={() => navigate("/edit-reservation")}>
                Godzina: 12:00-13:00
              </HoursLabel>
            </DivsReserved>
          </Grid>
          <Grid item>
            <DivsReserved>
              <HoursLabel onClick={() => navigate("/edit-reservation")}>
                Godzina: 13:00-14:00
              </HoursLabel>
            </DivsReserved>
          </Grid>
          <Grid item>
            <DivsReserved style={{ background: "red" }}>
              <HoursLabel onClick={() => navigate("/edit-reservation")}>
                Godzina: 14:00-15:00
              </HoursLabel>
            </DivsReserved>
          </Grid>
          <Grid item>
            <DivsReserved>
              <HoursLabel onClick={() => navigate("/edit-reservation")}>
                Godzina: 15:00-16:00
              </HoursLabel>
            </DivsReserved>
          </Grid>
        </Grid>

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
