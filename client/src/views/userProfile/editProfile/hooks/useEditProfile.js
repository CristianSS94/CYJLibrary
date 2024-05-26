import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../../../redux/actions";

export const useEditProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [editUser, setEditUser] = useState(user);
  const [show, setShow] = useState(false);
  const [msgError, setMsgError] = useState("");

  //Ver Contraseña en el input
  const handleClick = () => setShow(!show);

  //Actualizar valores del input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };

  //Traer datos del usuario una vez actualiza sus datos
  const getDataUser = () => {
    console.log(user.user_id);
    axios
      .get(`http://localhost:3000/users/userdata/${user.user_id}`)
      .then((res) => {
        dispatch(updateUser(res.data.user));
      })
      .catch((err) => {
        console.log("Error al actualizar al usuario:", err);
      });
  };

  //Actualizar los datos una vez pulsa modificar
  const handleSubmit = () => {
    axios
      .put("http://localhost:3000/users/edituser", editUser)
      .then((res) => getDataUser())
      .catch((err) => console.log(err));
  };

  return { show, handleClick, handleChange, msgError, handleSubmit, editUser };
};
