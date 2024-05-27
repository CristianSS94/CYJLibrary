import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Spinner } from "@chakra-ui/react";

export const ConfirmateUser = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [spinner, setSpinner] = useState(false);

  const confirmateUser = () => {
    setSpinner(true);
    axios
      .put(`http://localhost:3000/users/confirmationuser/${token}`)
      .then((res) => {
        navigate("/login");
        setSpinner(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    confirmateUser();
  }, []);

  return <>{spinner ? <Spinner /> : null}</>;
};
