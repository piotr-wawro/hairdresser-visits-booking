import logo from "../assets/logo1.jpg";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <div className="navbarbox" style={{}}>
        <div className="navbaritems">
          <div
            id="mainbox"
            style={{
              backgroundColor: "lightblue",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <div
              id="Header1"
              style={{
                display: "flex",
                justifyContent: "center",
                backgroundColor: "blue",
                alignItems: "center",
              }}
            >
              <div
                className="logo"
                style={{
                  backgroundColor: "blue",
                  display: "flex",
                  flex: 1,
                  justifyContent: "right",
                  marginTop: 3,
                  marginRight: 25,
                }}
              >
                <img src={logo} style={{ height: 80, width: 80 }} />
              </div>

              <h1
                id="mainheader"
                style={{
                  color: "white",
                  height: 30,
                  fontWeight: "bold",
                  flex: 1.5,
                }}
              >
                Hairdresser visits booking!
              </h1>

              <button
                className="navbarbutton"
                style={{
                  height: 50,
                  width: 100,
                  fontWeight: "bold",
                  padding: 5,
                  cursor: "pointer",
                  color: "black",
                  fontSize: 18,
                  flex: 0.25,
                  marginRight: 60,
                }}
                onClick={() => navigate("/log-in")}
              >
                Logowanie
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
