import "./App.css";

//Components
import Header from "./components/Header/Header";
import Content from "./components/Content/Content";

function App() {
  localStorage.setItem('Auth', 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWZkNTFlMGY5NWUxM2Y1OWNhZjdkMzYiLCJpYXQiOjE2NDM5OTE1NTEsImV4cCI6MTY0NDAyNzU1MX0.eyDn3EYbNnhaW-kyE8IHfSSwOToWweJKTg3AHxC5rgE');
  return (
    <>
      <Header />
      <Content />
    </>
  );
}

export default App;
