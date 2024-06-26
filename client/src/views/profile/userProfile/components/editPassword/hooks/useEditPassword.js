import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { ruta } from "../../../../../../routes/data";
import { useGetUser } from "../../../../../../hooks/useGetUser";

export const useEditPassword = () => {
  const { getDataUser } = useGetUser();

  //Traigo al usuario logado
  const user = useSelector((state) => state.auth.user);
  //Estado que almacena la contraseña actual
  const initialPassword = {
    password: "",
  };
  const [userPassword, setUserPassword] = useState(initialPassword);
  //Estado que almacena la nueva contraseña
  const initialNewPassword = {
    password: "",
    password2: "",
  };
  const [newPassword, setNewPassword] = useState(initialNewPassword);
  //Estado que permite modificar la contraseña actual
  const [verifyPassword, setVerifyPassword] = useState(false);
  //Estado que maneja ver las contraseñas
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const navigate = useNavigate();

  //Funcion que controla el input de la nueva contraseña
  const handleChangeNew = (e) => {
    const { name, value } = e.target;
    setNewPassword({ ...newPassword, [name]: value });
  };

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

  //Modifica la contraseña actual y la cambia por la nueva
  const handleSubmitNewPassword = () => {
    if (newPassword.password === newPassword.password2) {
      console.log(newPassword.password);
      axios
        .put(`http://localhost:3000/users/editpassword/${user.user_id}`, newPassword)
        .then((res) => {
          getDataUser();
          navigate(ruta.perfil);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return {
    show,
    userPassword,
    verifyPassword,
    newPassword,

    handleClick,
    handleChange,
    handleChangeNew,

    handleSubmitPassword,
    handleSubmitNewPassword,
    navigate,
  };
};
