import { BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";

import { FooterApp, NavbarApp } from "../layout";
import { PrivateRoutes, PublicRoutes } from "./routesLayout";

import "./stylesGeneral.scss";

export const RoutesBooks = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <BrowserRouter>
      <header className="header-container-library">
        <NavbarApp />
      </header>
      <main className="main-container-library">{!isLoggedIn ? <PublicRoutes /> : <PrivateRoutes />}</main>
      <footer className="footer-container-library">
        <FooterApp />
      </footer>
    </BrowserRouter>
  );
};
