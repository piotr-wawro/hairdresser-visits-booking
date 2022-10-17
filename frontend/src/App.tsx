//import image from '../src/logo1.jpg'; -- nie dziala 


function MainButton1(){
  return (
      <div className="navbar" style={{display: 'flex', justifyContent: 'center', backgroundColor: "lightblue", height: 80}}>
          <div className="navbarbox" style={{}}>

              <span className="navbarlogo"></span>


              <div className="navbaritems" style={{height: 30, fontWeight:"bold"}}>

              
              <button className="navbarbutton" style={{height: 50, width: 200, fontWeight:"bold",padding: 5, cursor:"pointer", color:"blue", fontSize: 18}}>Rezerwacja</button>
             
                  
              
              </div>

          </div>
      
      </div>
          
  )
}

function MainButton2(){
  return (
      <div className="navbar" style={{display: 'flex', justifyContent: 'center', backgroundColor: "lightblue", height: 80}}>
          <div className="navbarbox" style={{}}>
              <span className="navbarlogo"></span>
              <div className="navbaritems" style={{height: 30, fontWeight:"bold"}}>

              
              
              <button className="navbarbutton" style={{height: 50, width: 200, fontWeight:"bold",padding: 5, cursor:"pointer", color:"blue", fontSize: 18}}>Dodaj klienta</button>
            
                
              
              </div>

          </div>
      
      </div>
          
  )
}

function MainButton3(){
  return (
      <div className="navbar" style={{display: 'flex', justifyContent: 'center', backgroundColor: "lightblue", height: 80}}>
          <div className="navbarbox" style={{}}>
              <span className="navbarlogo"></span>
              <div className="navbaritems" style={{height: 30, fontWeight:"bold"}}>

              
              
              <button className="navbarbutton" style={{height: 50, width: 200, fontWeight:"bold",padding: 5, cursor:"pointer", color:"blue", fontSize: 18}}>Dodaj pracownika</button>
             
              
              </div>

          </div>
      
      </div>
          
  )
}


function MainButton4(){
  return (
      <div className="navbar" style={{display: 'flex', justifyContent: 'center', backgroundColor: "lightblue", height: 80}}>
          <div className="navbarbox" style={{}}>
              <span className="navbarlogo"></span>
              <div className="navbaritems" style={{height: 30, fontWeight:"bold"}}>

              
              
              <button className="navbarbutton" style={{height: 50, width: 200, fontWeight:"bold",padding: 5, cursor:"pointer", color:"blue", fontSize: 18}}>Dodaj czas i miejsce</button>
              
                 
              
              </div>

          </div>
      
      </div>
          
  )
}

function MainButton5(){
  return (
      <div className="navbar" style={{display: 'flex', justifyContent: 'center', backgroundColor: "lightblue", height: 80}}>
          <div className="navbarbox" style={{}}>
              <span className="navbarlogo"></span>
              <div className="navbaritems" style={{height: 30, fontWeight:"bold"}}>

              
              
              <button className="navbarbutton" style={{height: 50, width: 200, fontWeight:"bold",padding: 5, cursor:"pointer", color:"blue", fontSize: 18}}>Logowanie</button>
              
              </div>

          </div>
      
      </div>
          
  )
}



function App() {
  return (

    <div className="App" style={{color: "lightblue"}}>

      <header className="App-header" >


          <div id="mainbox" style={{backgroundColor: "blue"}}>


        
          <div id="Header1" style={{display: 'flex', justifyContent: 'center'}}>

          <h1 id="mainheader" style={{ color:"white", height: 30}}>Hairdresser visits booking!</h1>

    </div>

    <div className="logo" style={{backgroundColor: "white"}}>
      
          <img src="logo1.jpg"/> {/*nie dziala */}
          
    </div>

<div >
  <MainButton1/> 
</div>

<div>
  <MainButton2/> 
</div>

<div>
  <MainButton3/> 
</div>

<div>
  <MainButton4/> 
</div>

<div>
  <MainButton5/> 
</div>

<div style={{backgroundColor: "lightblue", height: 150}}>
   
</div>



        </div>
        
          
        
      </header>
    </div>
  );
}

export default App;
