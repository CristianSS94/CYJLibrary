import { Box, Heading, Text } from "@chakra-ui/react";
import React from "react";

export const PublicHome = () => {
  return (
    <Box sx={{ padding: "1rem" }}>
      <Heading as="h1" size="xl" mb={4}>
        Bienvenido a CYJLibrary
      </Heading>
      <Text fontSize="lg">Intercambia libros y descubre nuevas historias</Text>
    </Box>
  );
};
