import { useState } from "react";
import { login } from "../../../redux/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useUserLogin = () => {
  const initialValue = {
    email: "",
    password: "",
  };
  //Estado que maneja la muestra de la contraseña
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const [loginData, setLoginData] = useState(initialValue);
  const [msgError, setMsgError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const dispatch = useDispatch();

  const handleSubmit = () => {
    axios
      .post("http://localhost:3000/users/loginuser", loginData)
      .then((res) => {
        dispatch(login(res.data.user));
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setMsgError(err.response.data);
      });
  };

  return {
    handleClick,
    show,
    loginData,
    msgError,
    navigate,
    handleChange,
    handleSubmit,
  };
};
