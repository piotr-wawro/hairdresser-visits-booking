//import Logo from './logo1.jpg';


function Navbar(){
  return (
      <div className="navbar" style={{display: 'flex', justifyContent: 'center', backgroundColor: "lightblue", height: 30}}>
          <div className="navbarbox" style={{}}>
              <span className="navbarlogo"></span>
              <div className="navbaritems" style={{height: 30, fontWeight:"bold"}}>
              <button className="navbarbutton" style={{height: 30, fontWeight:"bold",padding: 5, cursor:"pointer", color:"blue"}}>Rezerwacja</button>
              <button className="navbarbutton" style={{height: 30, fontWeight:"bold",padding: 5, cursor:"pointer", color:"blue",  marginLeft: 20}}>Dodaj klienta</button>
              <button className="navbarbutton" style={{height: 30, fontWeight:"bold",padding: 5, cursor:"pointer", color:"blue", marginLeft: 20}}>Dodaj pracownika</button>
              <button className="navbarbutton" style={{height: 30, fontWeight:"bold",padding: 5, cursor:"pointer", color:"blue", marginLeft: 20}}>Dodaj czas i miejsce</button>
              
                  <button className="navbarbutton" style={{height: 30, fontWeight:"bold",padding: 5, cursor:"pointer", color:"blue",  marginLeft: 20}}>Logowanie</button>
              </div>

          </div>
      
      </div>
          
  )
}




function App() {
  return (

    <div className="App">

      <header className="App-header">


        <div id="mainbox" style={{backgroundColor: "blue"}}>


        
        <div id="Header1" style={{display: 'flex', justifyContent: 'center'}}>

          <h1 id="mainheader" style={{ color:"white"}}>Hairdresser visits booking!</h1>

    </div>

    <div className="logo">
          <img src="logo1.jpg"/>
    </div>

<div>
  <Navbar/> 
</div>



        </div>
        
          
        
      </header>
    </div>
  );
}

export default App;
