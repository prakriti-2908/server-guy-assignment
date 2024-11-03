import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Comments from "./components/Comments";
import "./App.css";
import { NameProvider } from "./components/context/NameContext";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <NameProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/comments" element={<Comments />} />
        </Routes>
      </Router>
    </NameProvider>
  );
}

export default App;
