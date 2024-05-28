import { Navigate, Route, Routes } from "react-router-dom";

import { ConfirmateUser, UserLogin } from "../../../auth";
import { UserInbox, UserLibrary, UserProfile } from "../../../views/users";
import { DeleteUser, EditPassword, EditProfile } from "../../../views/users/userProfile/components";
import { AllUsers } from "../../../views/users/AllUsers/AllUsers";
import { OneUser } from "../../../views/users/AllUsers/components/oneUser/OneUser";
import { ruta } from "../../data";

export const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to={ruta.home} />} />
      <Route path={ruta.logout} element={<UserLogin />} />
      <Route path={ruta.perfil} element={<UserProfile />} />
      <Route path={ruta.editarPerfil} element={<EditProfile />} />
      <Route path={ruta.editarPassword} element={<EditPassword />} />
      <Route path={ruta.biblioteca} element={<UserLibrary />} />
      <Route path={ruta.mensajes} element={<UserInbox />} />
      <Route path={ruta.confirmarUsuario} element={<ConfirmateUser />} />
      <Route path={ruta.borrarCuenta} element={<DeleteUser />} />
      <Route path={ruta.usuarios} element={<AllUsers />} />
      <Route path={ruta.otrousuario} element={<OneUser />} />
    </Routes>
  );
};
