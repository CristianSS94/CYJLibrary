import { Link as ChakraLink, Flex, Spacer, Text } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";

import { logout } from "../../../../redux";
import { ruta } from "../../../../routes/data";
import { delLocalStorage } from "../../../../utils";

export const NavBarLogged = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOut = () => {
    delLocalStorage("token");
    dispatch(logout());
    navigate(ruta.home);
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
      <ChakraLink onClick={logOut}>LogOut</ChakraLink>
    </Flex>
  );
};
