import MainBox from "../components/MainBox.js";
import background from "../assets/background.jpg";
import graphic1 from "../assets/graphic1.jpg";
import graphic2 from "../assets/graphic2.jpg";
import graphic3 from "../assets/graphic3.jpg";
import { useNavigate } from "react-router-dom";
import "./Style.css";
import logo from "../assets/logo1.jpg";
import styled from "styled-components";

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
  padding: 25px;
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

const ImageHolder = styled.div`
  display: flex;
  margin-left: auto;
  margin-right: auto;
  gap: 80px;
  width: 80%;
`;

const Img = styled.img`
  height: 250px;
  width: 40%;
`;
const Home = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Navbar>
        <Logo src={logo}></Logo>
        <Header1>Hairdresser visits booking!</Header1>

        <NavbarButton onClick={() => navigate("/main-menu-for-user")}>
          Dalej
        </NavbarButton>
      </Navbar>
      <Card>
        <ImageHolder>
          <Img src={graphic1}></Img>

          <Img src={graphic2}></Img>
        </ImageHolder>
      </Card>
    </Container>
  );
};

export default Home;
