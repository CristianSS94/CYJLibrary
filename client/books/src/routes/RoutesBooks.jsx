import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { HomeBooks } from "../views/home/HomeBooks";
import { NavBooks } from "../layout/navBooks/NavBooks";
import { UserRegister } from "../auth/userRegister/UserRegister";
import { useRoutesBooks } from "./useRoutesBooks";
import { UserLogin } from "../auth/userLogin/UserLogin";

export const RoutesBooks = () => {
  const { ruta } = useRoutesBooks();

  return (
    <BrowserRouter>
      <header>
        <NavBooks />
      </header>
      <Routes>
        <Route path={ruta.home} element={<HomeBooks />} />
        <Route path={ruta.login} element={<UserLogin />} />
        <Route path={ruta.registro} element={<UserRegister />} />
      </Routes>
    </BrowserRouter>
  );
};
