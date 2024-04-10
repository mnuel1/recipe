import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Recipes from "./pages/Recipes";
import ContactUs from "./pages/ContactUs";
import Nav from "./components/Navigation";
import "./App.css";
import { useEffect, useState } from "react";
import {
  autoLogin,
  getLoggedInUser,
  saveLoggedInUser,
} from "./services/authService";

export default function App() {
  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    autoLogin()
      .then((res) => {
        saveLoggedInUser(res.data.id, res.data.username);
        handleOnLogin();
      })
      .catch((err) => {
        console.log(err.response.status);
      });
  }, []);

  const handleOnLogin = () => {
    const user = getLoggedInUser();
    console.log(user);
    setActiveUser(user);
  };

  return (
    <BrowserRouter>
      <Nav activeUser={activeUser} onLogin={handleOnLogin} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="recipes" element={<Recipes />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
    </BrowserRouter>
  );
}
