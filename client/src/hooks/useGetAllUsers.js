import axios from "axios";
import { useDispatch } from "react-redux";
import { updateAllUsers } from "../redux/actions/actions";
import { urlUsers } from "../routes/data";

export const useGetAllUsers = () => {
  const dispatch = useDispatch();

  const getAllUsersData = () => {
    axios
      .get(`${urlUsers}/getallusers`)
      .then((res) => {
        dispatch(updateAllUsers(res.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return { getAllUsersData };
};
