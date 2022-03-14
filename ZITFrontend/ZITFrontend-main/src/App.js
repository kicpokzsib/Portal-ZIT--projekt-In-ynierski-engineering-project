import React from "react";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import { Routers } from "./routers/Router";
import { BrowserRouter as Router } from "react-router-dom";
import "./css/style.css";

function App() {
  return (
    <Router basename="/">
      <div className="App ">
        <Header />
        <div className="content">
          <Routers />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
