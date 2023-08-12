import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  const handleLogin = (input) => {
    const { email, password } = input;
    axios
      .post("http://localhost:8000/api/login", { email, password })
      .then((res) => {
        Cookies.set("token", res.data.token);
        Cookies.set("id", res.data.id);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  const values = { profile, setProfile, handleLogin };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};
