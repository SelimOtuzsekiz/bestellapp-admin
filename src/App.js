import React, {useState} from "react";
import "./App.css";

//Components
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";

function App() {
  localStorage.setItem('Auth', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWZkNTFlMGY5NWUxM2Y1OWNhZjdkMzYiLCJpYXQiOjE2NDQ0OTc2NjUsImV4cCI6MTY0NDUzMzY2NX0.K6crLrVZT-w2M4CFeUdmgyTyTdcVdKcV0iTBtUbyxC8');
  
  const[status,setStatus] = useState("offen");

  return (
    <>
      <Header />
      <Content status={status}/>
    </>
  );
}

export default App;
