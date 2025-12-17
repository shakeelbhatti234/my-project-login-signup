import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // <-- Correct imports
import Loginform from "./login/loginform";
import RegisterForm from "./register/registerform";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loginform />} />
        <Route path="/registerform" element={<RegisterForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
