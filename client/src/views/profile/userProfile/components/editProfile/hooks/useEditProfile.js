import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetDataUser } from "../../../../../../utils";
import { ruta } from "../../../../../../routes/data";

export const useEditProfile = () => {
  const { getDataUser } = useGetDataUser();
  const user = useSelector((state) => state.auth.user);
  const [editUser, setEditUser] = useState(user);
  const [show, setShow] = useState(false);
  const [msgError, setMsgError] = useState("");
  const navigate = useNavigate();

  //Ver Contraseña en el input
  const handleClick = () => setShow(!show);

  //Actualizar valores del input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  //Traer datos del usuario una vez actualiza sus datos

  //Actualizar los datos una vez pulsa modificar
  const handleSubmit = () => {
    axios
      .put("http://localhost:3000/users/edituser", editUser)
      .then((res) => {
        getDataUser();
        navigate(ruta.perfil);
      })
      .catch((err) => console.log(err));
  };

  return {
    show,
    handleClick,
    handleChange,
    msgError,
    handleSubmit,
    editUser,
    navigate,
  };
};
