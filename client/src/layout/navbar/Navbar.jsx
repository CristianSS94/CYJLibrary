import React from "react";
import { useSelector } from "react-redux";

import { NavBarLogged, NavBarNotLogged } from "./components";

export const NavbarApp = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return <>{isLoggedIn ? <NavBarLogged /> : <NavBarNotLogged />}</>;
};
