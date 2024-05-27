import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export const ConfirmateUser = () => {
  const navigate = useNavigate();
  const { token } = useParams();

  const confirmateUser = () => {
    axios
      .put(`http://localhost:3000/users/confirmationuser/${token}`)
      .then((res) => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    confirmateUser();
  }, []);

  return <div>Un futuro spinner</div>;
};
