import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { HomeBooks } from "../views/home/HomeBooks";
import { NavBooks } from "../layout/navBooks/NavBooks";
import { UserRegister } from "../auth/userRegister/UserRegister";
import { useRoutesBooks } from "./useRoutesBooks";
import { UserLogin } from "../auth/userLogin/UserLogin";
import { UserProfile } from "../views/userProfile/UserProfile";
import { EditProfile } from "../views/userProfile/editProfile/EditProfile";

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
        <Route path={ruta.logout} element={<UserLogin />} />
        <Route path={ruta.registro} element={<UserRegister />} />
        <Route path={ruta.perfil} element={<UserProfile />} />
        <Route path={ruta.editarPerfil} element={<EditProfile />} />
      </Routes>
    </BrowserRouter>
  );
};
