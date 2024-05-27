import { Flex, Link as ChakraLink, Text, Spacer } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { ruta } from "../../../../routes/routesClient";
import { delLocalStorage } from "../../../../helpers/localStorageUtils";
import { useDispatch, useSelector } from "react-redux";

export const NavBarLogged = () => {
  const dispatch = useDispatch();

  const logOut = () => {
    delLocalStorage("token");
    dispatch(logOut());
  };

  return (
    <Flex p="4" bg="teal.500" color="white">
      <ChakraLink as={RouterLink} to={ruta.home}>
        <Text fontSize="xl">CYJLibrary</Text>
      </ChakraLink>
      <Spacer />
      <ChakraLink as={RouterLink} to={ruta.mensajes} mr="4">
        Mensajes
      </ChakraLink>
      <ChakraLink as={RouterLink} to={ruta.biblioteca} mr="4">
        Biblioteca
      </ChakraLink>
      <ChakraLink as={RouterLink} to={ruta.perfil} mr="4">
        Perfil
      </ChakraLink>
      <ChakraLink as={RouterLink} onClick={logOut}>
        Log Out
      </ChakraLink>
    </Flex>
  );
};
