import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { ruta } from "../../routes/routesBooks";

export const useGetDataUser = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getDataUser = () => {
    axios
      .get(`http://localhost:3000/users/userdata/${user.user_id}`)
      .then((res) => {
        console.log("getDataUser", res);
        dispatch(updateUser(res.data.user));
      })
      .catch((err) => {
        console.log("Error al actualizar al usuario:", err);
      })
      .finally(() => navigate(ruta.perfil));
  };

  return { getDataUser };
};
