import { Flex, Link as ChakraLink, Text, Spacer } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

import { useRoutesBooks } from "../../../../routes/routesBooks";

export const NavBarLogged = () => {
  const { ruta } = useRoutesBooks();
  return (
    <Flex p="4" bg="teal.500" color="white">
      <ChakraLink as={RouterLink} to={ruta.home}>
        <Text fontSize="xl">CYJ</Text>
      </ChakraLink>
      <Spacer />
      <ChakraLink as={RouterLink} to={ruta.perfil} mr="4">
        Perfil
      </ChakraLink>
      <ChakraLink as={RouterLink} to={ruta.logout}>
        Log Out
      </ChakraLink>
    </Flex>
  );
};
