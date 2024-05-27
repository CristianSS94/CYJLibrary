import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "./redux/actions";

import { RoutesBooks } from "./routes/RoutesBooks";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const id = decoded.user_id; // Asegúrate de que el campo de ID del usuario esté correctamente definido

        // Obtener los datos del usuario y almacenarlos en Redux
        axios
          .get(`http://localhost:3000/users/userdata/${id}`)
          .then((res) => {
            dispatch(updateUser(res.data.user));
          })
          .catch((err) => {
            console.log("Error al actualizar al usuario:", err);
          });
      } catch (error) {
        console.log("Error al decodificar el token:", error);
      }
    }
  }, [dispatch]);
  return (
    <>
      <RoutesBooks />
    </>
  );
};

export default App;
