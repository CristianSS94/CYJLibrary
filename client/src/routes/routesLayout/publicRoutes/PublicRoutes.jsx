import { Navigate, Route, Routes } from "react-router-dom";

import { ruta } from "../../data";
import { UserLogin, UserRegister } from "../../../auth";
import { HomeBooks } from "../../../views/home/HomeBooks";

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path={ruta.home} element={<HomeBooks />} />
      <Route path="*" element={<Navigate to={ruta.home} />} />
      <Route path={ruta.login} element={<UserLogin />} />
      <Route path={ruta.registro} element={<UserRegister />} />
    </Routes>
  );
};
