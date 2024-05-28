import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { updateUser } from "./redux";
import { RoutesBooks } from "./routes/RoutesBooks";

const App = () => {
  const dispatch = useDispatch();

  const getTokenUser = () => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const id = decoded.user_id;
        axios
          .get(`http://localhost:3000/users/userdata/${id}`)
          .then((res) => {
            console.log(res);
            dispatch(updateUser(res.data.user));
          })
          .catch((err) => {
            console.log("Error al actualizar al usuario:", err);
          });
      } catch (error) {
        console.log("Error al decodificar el token:", error);
      }
    }
  };

  useEffect(() => getTokenUser(), [dispatch]);

  return (
    <>
      <RoutesBooks />
    </>
  );
};

export default App;
