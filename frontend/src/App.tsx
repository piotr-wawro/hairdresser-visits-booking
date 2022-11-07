import logo from "./assets/logo1.jpg";
import graphic1 from "./assets/graphic1.jpg";
import graphic2 from "./assets/graphic2.jpg";
import graphic3 from "./assets/graphic3.jpg";
import { Route, Routes } from "react-router-dom";
import Home from "./views/Home.js";
import LogIn from "./views/LogIn.js";
import MainMenu from "./views/MainMenu.js";
import Navbar from "./components/Navbar.js";

function App() {
  return (
    <div className="App" style={{ backgroundColor: "white" }}>
      

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/main-menu" element={<MainMenu />} />
      </Routes>
    </div>
  );
}

export default App;
