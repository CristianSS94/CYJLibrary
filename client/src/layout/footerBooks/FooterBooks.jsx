import { Box, Flex } from "@chakra-ui/react";
import React from "react";

export const FooterBooks = () => {
  return (
    <Flex p="4" bg="teal.500" color="white">
      <p>
        <i className="black">&copy; </i> 2024{" "}
        <a href="https://www.linkedin.com/in/cristian-sanchez-serrano/" target="_blank">
          Cristian Sánchez Serrano.{" "}
        </a>
        Todos los derechos reservados.
      </p>
    </Flex>
  );
};
