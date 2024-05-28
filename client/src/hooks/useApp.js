import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux";
import { updateCategories } from "../redux/actions/actions";
import { urlCategories } from "../routes/data/routesServer/routesServer";

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

  const getAllCategories = () => {
    axios
      .get(`${urlCategories}/allCategories`)
      .then((res) => {
        dispatch(updateCategories(res.data));
      })
      .catch((err) => {
        console.log("Error al actualizar al usuario:", err);
      });
  };

  return { dispatch, getAllCategories, getTokenUser };
};
