import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux";

export const useApp = () => {
  const dispatch = useDispatch();

  const getTokenUser = () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const id = decoded.user_id;
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
  };

  return { dispatch, getAllCategories, getTokenUser };
};
