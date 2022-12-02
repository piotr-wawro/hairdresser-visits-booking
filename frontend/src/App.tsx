import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import AddEmployee from "./views/AddEmployee.js";
import AddSchedule from "./views/AddSchedule.js";
import Home from "./views/Home.js";
import LogIn from "./views/LogIn.js";
import LogInToken from "./views/LogInToken.js";
import Navbar from "./components/Navbar.js";
import Profile from "./views/Profile.js";

const Container = styled.div``;

function App() {
  return (
    <Container>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/log-in/:token" element={<LogInToken />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/manager/add-employee" element={<AddEmployee />} />
        <Route path="/manager/add-schedule" element={<AddSchedule />} />
      </Routes>
    </Container>
  );
}

export default App;
