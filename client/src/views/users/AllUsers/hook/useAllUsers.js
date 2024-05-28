import axios from "axios";
import { useMemo, useState } from "react";
import { urlUsers } from "../../../../routes/data";
import { useNavigate } from "react-router-dom";

export const useAllUsers = () => {
  const [allUsersData, setAlluserData] = useState(null);
  const [spinnerActive, setSpinnerActive] = useState(false);
  const [searchUser, setSearchUser] = useState("");
  const navigate = useNavigate();

  const getAllUsersData = () => {
    setSpinnerActive(true);
    axios
      .get(`${urlUsers}/getallusers`)
      .then((res) => {
        console.log(res.data);
        setAlluserData(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setSpinnerActive(false);
      });
  };

  const goToProfile = (elem) => {
    navigate("/oneUser", { state: elem });
  };

  const handleChangue = (e) => {
    setSearchUser(e.target.value);
  };

  const allUsersFiltered = useMemo(() => {
    let _dataFiltered = allUsersData;

    if (searchUser) {
      _dataFiltered = _dataFiltered?.filter((e) => e.user_name.toLowerCase().includes(searchUser.toLowerCase()));
    }

    return _dataFiltered;
  });

  return { getAllUsersData, allUsersFiltered, goToProfile, handleChangue, searchUser, spinnerActive };
};

/*

src={elem.img === null ? "/images/users/usuario_defecto.png" : `${elem.img}`}

key={elem.user_id}

{elem.user_name} {elem.last_name}

*/
