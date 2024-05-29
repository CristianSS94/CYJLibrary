import { Navigate, Route, Routes } from "react-router-dom";

import { UserLogin, UserRegister } from "../../../auth";
import { PublicHome } from "../../../views/home/PublicHome";
import { ruta } from "../../data";

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path={ruta.home} element={<PublicHome />} />
      <Route path="*" element={<Navigate to={ruta.home} />} />
      <Route path={ruta.login} element={<UserLogin />} />
      <Route path={ruta.registro} element={<UserRegister />} />
    </Routes>
  );
};
