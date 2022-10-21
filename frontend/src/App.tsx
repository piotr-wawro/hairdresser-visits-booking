import logo from "./graphics/logo1.jpg";
import graphic1 from "./graphics/graphic1.jpg";
import graphic2 from "./graphics/graphic2.jpg";
import graphic3 from "./graphics/graphic3.jpg";
import background from "./graphics/background.jpg";

function Navbar() {
  return (
    <div className="navbar">
      <div
        className="navbarbox"
        style={{
          justifyContent: "space-between",
          marginLeft: 300,
          marginTop: 15,
        }}
      >
        <span className="navbarlogo"></span>

        <div className="navbaritems" style={{ height: 30, fontWeight: "bold" }}>
          <button
            className="navbarbutton"
            style={{
              height: 50,
              width: 200,
              fontWeight: "bold",
              padding: 5,
              cursor: "pointer",
              color: "black",
              fontSize: 18,
            }}
          >
            Zaloguj się
          </button>
        </div>
      </div>
    </div>
  );
}

function MainBox1() {
  return (
    <div id="box1">
      <img src={graphic1} style={{ height: 300, width: 400 }} />
      <h2
        style={{
          display: "flex",
          flexDirection: "row",
          marginLeft: 100,
          color: "blue",
          width: 230,
        }}
      >
        Rezerwacji wizyty
      </h2>
    </div>
  );
}

function MainBox2() {
  return (
    <div id="box1">
      <img src={graphic3} style={{ height: 300, width: 400 }} />
      <h2
        style={{
          display: "flex",
          flexDirection: "row",
          marginLeft: 100,
          color: "blue",
          width: 230,
        }}
      >
        Dodania pracownika
      </h2>
    </div>
  );
}

function MainBox3() {
  return (
    <div id="box1">
      <img src={graphic2} style={{ height: 300, width: 400 }} />
      <h2
        style={{
          display: "flex",
          flexDirection: "row",
          marginLeft: 100,
          color: "blue",
          width: 230,
        }}
      >
        Edycji danych wizyty
      </h2>
    </div>
  );
}

function App() {
  return (
    <div className="App" style={{ backgroundColor: "lightblue" }}>
      <header className="App-header">
        <div
          id="mainbox"
          style={{ backgroundColor: "lightblue", height: "100%" }}
        >
          <div
            id="Header1"
            style={{
              display: "flex",
              justifyContent: "center",
              backgroundColor: "blue",
            }}
          >
            <div
              className="logo"
              style={{
                backgroundColor: "lightblue",
                display: "flex",
                justifyContent: "left",
                marginTop: 3,
                marginRight: 25,
              }}
            >
              <img src={logo} style={{ height: 80, width: 80 }} />
            </div>

            <h1
              id="mainheader"
              style={{ color: "white", height: 30, fontWeight: "bold" }}
            >
              Hairdresser visits booking!
            </h1>

            <Navbar />
          </div>
        </div>
      </header>

      <div
        id="MainBox"
        style={{ height: 600, backgroundImage: `url(${background})` }}
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
            marginTop: 80,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginRight: 30,
            marginLeft: 30,
          }}
        >
          <MainBox1 />

          <MainBox2 />

          <MainBox3 />
        </div>
      </div>
    </div>
  );
}

export default App;
