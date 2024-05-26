import { Flex, Spacer, Text, Link as ChakraLink } from "@chakra-ui/react";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useRoutesBooks } from "../../../../routes/useRoutesBooks";

export const NavBarNotLogged = () => {
  const { ruta } = useRoutesBooks();
  return (
    <Flex p="4" bg="teal.500" color="white">
      <ChakraLink as={RouterLink} to={ruta.home}>
        <Text fontSize="xl">CYJ</Text>
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
