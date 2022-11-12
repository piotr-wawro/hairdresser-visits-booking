import { TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MainBox from "../components/MainBox.js";
import background from "../assets/background.jpg";
import graphic1 from "../assets/graphic1.jpg";
import graphic2 from "../assets/graphic2.jpg";
import graphic3 from "../assets/graphic3.jpg";
import "./Style.css";
import logo from "../assets/logo1.jpg";
import styled from "styled-components";

const MainMenu = () => {
  const navigate = useNavigate();

  const Header1 = styled.h1``;

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
    padding: 10px;
    text-align: center;
    padding: 25px ;
    width: 100%;
  `;

  const Logo = styled.img`
    height: 80px;
    width: 80px;
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
    flex-direction: row;
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
    justifycontent: center;
    height: 550px;
    alignitems: center;
    margin-top: 30px;
    display:flex;
    width:80%;
  `;

  const MainMenuAddWorkerButton = styled.button`
    margin-top: 40px;
    justifycontent: "center";
    cursor: pointer;
    height: 40px;
    width: 200px;
    fontsize: 20px;
    background: lightgrey;
    font-weight: bold;
    margin-left: 40px;
    text-align: center;
  `;

  const MainMenuEditWorkerButton = styled.button`
    margin-top: 40px;
    justifycontent: "center";
    cursor: pointer;
    height: 40px;
    width: 200px;
    fontsize: 20px;
    background: lightgrey;
    font-weight: bold;
    text-align: center;
    margin-left: 40px;
  `;

  const ImageHolder = styled.div`
    display: flex;
    margin-left: auto;
    margin-right: auto;
    gap: 40px;
  `;

  return (
    <Container>
      <Navbar>
        <Logo src={logo}></Logo>
        <Header1>Zapisz się do fryzjera już dziś!</Header1>

        <NavbarButton onClick={() => navigate("/profile-user")}>
          Profil
        </NavbarButton>
      </Navbar>

      <Card>
        <MainMenuButtonBox>
          <MainMenuAddWorkerButton onClick={() => navigate("/add-user")}>
            Dodaj pracownika
          </MainMenuAddWorkerButton>

          <MainMenuEditWorkerButton onClick={() => navigate("/edit-user")}>
            Edytuj pracownika
          </MainMenuEditWorkerButton>
        </MainMenuButtonBox>
      </Card>
    </Container>
  );
};

export default MainMenu;
