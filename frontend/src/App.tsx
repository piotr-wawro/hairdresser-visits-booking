import logo from "./assets/logo1.jpg";
import graphic1 from "./assets/graphic1.jpg";
import graphic2 from "./assets/graphic2.jpg";
import graphic3 from "./assets/graphic3.jpg";
import { Route, Routes } from "react-router-dom";
import Home from "./views/Home.js";
import LogIn from "./views/LogIn.js";
import MainMenu from "./views/MainMenu.js";
import Navbar from "./components/Navbar.js";
import AddUser from "./views/AddUser.js";
import ProfileOfUser from "./views/ProfileOfUser.js";
import EditUser from "./views/EditUser.js";
import DoReservation from "./views/DoReservation.js";
import EditReservation from "./views/EditReservation.js";
import MainMenuForUser from "./views/MainMenuForUser.js";
import ManagerScreen from "./views/ManagerScreen.js";
import LogInToken from "./views/LogInToken.js";

function App() {
  return (
    <div className="App" style={{ backgroundColor: "white" }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/log-in/:token" element={<LogInToken />} />
        <Route path="/main-menu" element={<MainMenu />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/edit-user" element={<EditUser />} />
        <Route path="/profile-user" element={<ProfileOfUser />} />
        <Route path="/do-reservation" element={<DoReservation />} />
        <Route path="/edit-reservation" element={<EditReservation />} />
        <Route path="/main-menu-for-user" element={<MainMenuForUser />} />
        <Route path="/manager-screen" element={<ManagerScreen />} />
      </Routes>
    </div>
  );
}

export default App;
