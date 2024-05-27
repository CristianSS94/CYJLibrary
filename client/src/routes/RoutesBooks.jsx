import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { UserLogin } from "../auth/userLogin/UserLogin";
import { UserRegister } from "../auth/userRegister/UserRegister";
import { NavBooks } from "../layout/navBooks/NavBooks";
import { HomeBooks } from "../views/home/HomeBooks";
import { UserProfile } from "../views/userProfile/UserProfile";
import { ruta } from "./routesClient";
import { EditPassword } from "../views/userProfile/components/editPassword/EditPassword";
import { EditProfile } from "../views/userProfile/components/editProfile/EditProfile";
import { UserLibrary } from "../views/userLibrary/UserLibrary";
import { UserInbox } from "../views/userInbox/UserInbox";
import { ConfirmateUser } from "../auth/confirmateUser/ConfirmateUser";
import { DeleteUser } from "../views/userProfile/components/deleteUser/DeleteUser";

export const RoutesBooks = () => {
  return (
    <BrowserRouter>
      <header>
        <NavBooks />
      </header>
      <main>
        <Routes>
          <Route path={ruta.home} element={<HomeBooks />} />
          <Route path={ruta.login} element={<UserLogin />} />
          <Route path={ruta.logout} element={<UserLogin />} />
          <Route path={ruta.registro} element={<UserRegister />} />
          <Route path={ruta.perfil} element={<UserProfile />} />
          <Route path={ruta.editarPerfil} element={<EditProfile />} />
          <Route path={ruta.editarPassword} element={<EditPassword />} />
          <Route path={ruta.biblioteca} element={<UserLibrary />} />
          <Route path={ruta.mensajes} element={<UserInbox />} />
          <Route path={ruta.confirmarUsuario} element={<ConfirmateUser />} />
          <Route path={ruta.borrarCuenta} element={<DeleteUser />} />
          //TODO // //Rutas Privadas web ? // subir libros ? // modificar libros ? // borrar libros? // Marcar como intercambiado? requeriria modifica la DB y
          añadir algo tipo is_intercambiado y que sea true o false. esto afecataria al muestreo de libros ya que podria suponer poder aplicar un filtro de
          libros disponibles? tipo vinted que aunque vendas algo, se puede quedar en el perfil como vendido. // ver sus libros subidos? // ver libros de otros
          usuarios // mensajear a otro usuario. // borrar mensajes. //servidor falta el controlador de libros // servidor falta el controlador de mensaes crear
          consultad a la db con sequelize
        </Routes>
      </main>
    </BrowserRouter>
  );
};
