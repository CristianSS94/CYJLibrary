import { BrowserRouter } from "react-router-dom";
import { useSelector } from "react-redux";

import { NavBooks, FooterBooks } from "../layout";
import { PrivateRoutes, PublicRoutes } from "./routesLayout";

import "./stylesGeneral.scss";

export const RoutesBooks = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <BrowserRouter>
      <header className="header-container-library">
        <NavBooks />
      </header>
      <main className="main-container-library">
        {!isLoggedIn ? <PublicRoutes /> : <PrivateRoutes />}
        {/* //TODO 
        // subir libros ? 
        // modificar libros ?
         // borrar libros?
          // Marcar como intercambiado? requeriria modifica la DB y
        añadir algo tipo is_intercambiado y que sea true o false. esto afecataria al muestreo de libros ya que podria suponer poder aplicar un filtro de libros
        disponibles? tipo vinted que aunque vendas algo, se puede quedar en el perfil como vendido. 
        // ver sus libros subidos? 
        // ver libros de otros usuarios
        // mensajear a otro usuario. 
        // borrar mensajes. 
        //servidor falta el controlador de libros 
        // servidor falta el controlador de mensaes crear consultad a
        la db con sequelize */}
      </main>
      <footer className="footer-container-library">
        <FooterBooks />
      </footer>
    </BrowserRouter>
  );
};
