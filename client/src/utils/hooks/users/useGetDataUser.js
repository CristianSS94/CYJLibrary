import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { updateUser } from "../../../redux/actions/actions";

export const useGetDataUser = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const getDataUser = () => {
    axios
      .get(`http://localhost:3000/users/userdata/${user.user_id}`)
      .then((res) => {
        dispatch(updateUser(res.data.user));
      })
      .catch((err) => {
        console.log("Error al actualizar al usuario:", err);
      });
  };

  return { getDataUser };
};
