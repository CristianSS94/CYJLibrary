import React from "react";
import { useDispatch } from "react-redux";
import { updateCategories } from "../redux/actions/actions";
import { urlCategories } from "../routes/data/routesServer/routesServer";
import axios from "axios";

export const useGetCategories = () => {
  const dispatch = useDispatch();

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

  return { getAllCategories };
};
