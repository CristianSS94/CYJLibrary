import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useAllUsers = () => {
  const user = useSelector((state) => state.auth.user);
  const allUsers = useSelector((state) => state.getAllUsers.allUsers);
  const [spinnerActive, setSpinnerActive] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const navigate = useNavigate();

  const goToProfile = (elem) => {
    navigate("/oneUser", { state: elem });
  };

  const handleChangue = (e) => {
    setSearchUser(e.target.value);
  };

  const allUsersFiltered = useMemo(() => {
    let _dataFiltered = allUsers;

    if (searchUser) {
      _dataFiltered = _dataFiltered?.filter((e) => e.user_name.toLowerCase().includes(searchUser.toLowerCase()));
    }

    _dataFiltered = _dataFiltered.filter((e) => e.user_id !== user.user_id);

    return _dataFiltered;
  });

  return { allUsersFiltered, goToProfile, handleChangue, searchUser, spinnerActive };
};
