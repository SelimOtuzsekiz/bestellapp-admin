import React, {useState} from "react";
import "./App.css";

//Components
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";

function App() {
  localStorage.setItem('Auth', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWZjMjc2YzkwNjcxNTBmMTkzNzE2YzUiLCJpYXQiOjE2NDQ0OTczOTYsImV4cCI6MTY0NDUzMzM5Nn0.QO9N1cN_l7QQoAIN8udw_urUUjzgTarDQYhyo-w2S3M');
  
  const[status,setStatus] = useState("offen");

  return (
    <>
      <Header />
      <Content status={status}/>
    </>
  );
}

export default App;
