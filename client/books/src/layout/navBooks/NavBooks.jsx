import React from "react";
import { useSelector } from "react-redux";
import { NavBarLogged } from "./components/navBarLogged/NavBarLogged";
import { NavBarNotLogged } from "./components/navBarNotLogged/NavBarNotLogged";

export const NavBooks = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth.user);

  return <>{isLoggedIn ? <NavBarLogged /> : <NavBarNotLogged />}</>;
};
