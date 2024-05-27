import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useUserRegister = () => {
  //Estado que maneja la muestra de la contraseña
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  //Objeto que almacena los valores de los inputs
  const newUser = {
    name: "",
    lastName: "",
    email: "",
    email2: "",
    password: "",
    password2: "",
  };

  //Estados y funciones del Registro
  const [register, setRegister] = useState(newUser);
  const [msgError, setMsgError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };

  const handleSubmit = () => {
    if (!register.name || !register.lastName || !register.email || !register.password || !register.email2 || !register.password2) {
      setMsgError("Algun campo no está relleno");
    } else if (register.email !== register.email2) {
      setMsgError("Los correos no coinciden");
    } else if (register.password !== register.password2) {
      setMsgError("Las contraseñas no coinciden");
      // } else if (register.password.length < 10) {
      //   setMsgError("Contraseña demasiado corta");
    } else {
      axios
        .post("http://localhost:3000/users/createuser", register)
        .then((res) => {
          console.log(res.data);
          navigate("/");
        })
        .catch((err) => {
          console.log(err.response.data);
          if (err.response.data.error?.errno === 1062 && err.response.data.error?.sqlMessage.includes("user.email")) {
            setMsgError("Email duplicado");
          } else if (err.response.data.error?.errno === 1062 && err.response.data.error?.sqlMessage.includes("user.nickname")) {
            setMsgError("Nombre de usuario duplicado");
          } else if (err.response.data.error?.errno === 1406) {
            setMsgError("Campo demasiado largo");
          } else if (err.response.data.message === "Correo no valido") {
            setMsgError("El correo introducido no es valído para registrarse");
          } else {
            setMsgError("Upps ha habido algún error");
          }
        })
        .finally(() => setRegister(newUser));
    }
  };

  return {
    register,
    handleChange,
    handleSubmit,
    navigate,
    handleClick,
    show,
    msgError,
  };
};
