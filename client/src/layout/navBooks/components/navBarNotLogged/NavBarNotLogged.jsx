import { Flex, Spacer, Text, Link as ChakraLink } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { ruta } from "../../../../routes/routesBooks";

export const NavBarNotLogged = () => {
  return (
    <Flex p="4" bg="teal.500" color="white">
      <ChakraLink as={RouterLink} to={ruta.home}>
        <Text fontSize="xl">CYJLibrary</Text>
      </ChakraLink>
      <Spacer />
      <ChakraLink as={RouterLink} to={ruta.login} mr="4">
        Login
      </ChakraLink>
      <ChakraLink as={RouterLink} to={ruta.registro}>
        Registro
      </ChakraLink>
    </Flex>
  );
};
