import { Heading, Text } from "@chakra-ui/react";
import React from "react";

export const HomeBooks = () => {
  return (
    <div>
      <Heading as="h1" size="xl" mb={4}>
        Bienvenido a CYJBooks
      </Heading>
      <Text fontSize="lg">Intercambia libros y descubre nuevas historias</Text>
    </div>
  );
};
