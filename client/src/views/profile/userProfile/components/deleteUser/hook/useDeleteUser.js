import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

import { useState } from "react";
import { useGetToken } from "../../../../../../hooks/useGetToken";
import { logout } from "../../../../../../redux";
import { ruta } from "../../../../../../routes/data";

export const useDeleteUser = () => {
  //Traigo al usuario logado
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const { delLocalStorage } = useGetToken();

  const initialPassword = {
    password: "",
  };

  const [userPassword, setUserPassword] = useState(initialPassword);

  //Estado que permite borrar la cuenta
  const [verifyPassword, setVerifyPassword] = useState(false);

  //Estado que maneja ver las contraseñas
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const deleteUser = () => {
    axios
      .delete(`http://localhost:3000/users/deleteuser/${user.user_id}`, userPassword)
      .then((res) => {
        dispatch(logout());
        navigate(ruta.home);
        delLocalStorage("token");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const navigate = useNavigate();

  //Funcion que controla el input de la contraseña actual
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserPassword({ ...userPassword, [name]: value });
  };

  //Funcion que comprueba con el back la contraseña
  const handleSubmitPassword = () => {
    axios
      .put(`http://localhost:3000/users/verifypassword/${user.user_id}`, userPassword)
      .then((res) => {
        setVerifyPassword(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return { userPassword, verifyPassword, show, handleChange, handleChange, handleClick, handleSubmitPassword, deleteUser, navigate };
};
