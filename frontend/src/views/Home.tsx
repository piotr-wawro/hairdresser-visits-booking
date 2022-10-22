import MainBox from "../components/MainBox.js";
import background from "../assets/background.jpg";
import graphic1 from "../assets/graphic1.jpg";
import graphic2 from "../assets/graphic2.jpg";
import graphic3 from "../assets/graphic3.jpg";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      id="MainBox"
      style={{ height: 650, backgroundImage: `url(${background})` }}
    >
      <h1
        id="mainheader"
        style={{
          color: "white",
          height: 35,
          justifyContent: "center",
          display: "flex ",
          backgroundColor: "green",
          fontSize: 25,
        }}
      >
        Zaloguj się do:
      </h1>

      <div
        id="mainboxitems"
        style={{
          marginTop: 50,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginRight: 30,
          marginLeft: 30,
        }}
      >
        <MainBox graphic={graphic1} text="Rezerwacji wizyty" />

        <MainBox graphic={graphic3} text="Dodania pracownika" />

        <MainBox graphic={graphic2} text="Edycji danych" />
      </div>
    </div>
  );
};

export default Home;
