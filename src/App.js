import React, {useState} from "react";
import "./App.css";

//Components
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";

function App() {
  localStorage.setItem('Auth', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWZkNTFlMGY5NWUxM2Y1OWNhZjdkMzYiLCJpYXQiOjE2NDM5OTE1NTEsImV4cCI6MTY0NDAyNzU1MX0.eyDn3EYbNnhaW-kyE8IHfSSwOToWweJKTg3AHxC5rgE');
  
  const[status,setStatus] = useState("offen");

  return (
    <>
      <Header />
      <Content status={status}/>
    </>
  );
}

export default App;
