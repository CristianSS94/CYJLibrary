import { Box, Button, Heading, Stack, StackDivider, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { ruta } from "../../../routes/data";

export const UserProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  return (
    <Box sx={{ padding: "1rem" }}>
      <Box>
        <Heading size="md" sx={{ marginBottom: "1rem" }}>
          Mis datos
        </Heading>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Nombre completo:
            </Heading>
            <Text pt="2" fontSize="sm">
              {user?.user_name} {user?.last_name}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Email
            </Heading>
            <Text pt="2" fontSize="sm">
              {user?.email}
            </Text>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Telefóno
            </Heading>
            <Text pt="2" fontSize="sm">
              {user?.phone_number ? user?.phone_number : "No ha añadido ningún número de Telefóno"}
            </Text>
            <Stack sx={{ pt: "5", display: "flex", flexWrap: "wrap" }} spacing={4} direction="row" align="center">
              <Button colorScheme="teal" onClick={() => navigate(ruta.editarPerfil)}>
                Modificar datos
              </Button>
              <Button colorScheme="teal" onClick={() => navigate(ruta.editarPassword)}>
                Modificar contraseña
              </Button>
              <Button colorScheme="teal" onClick={() => navigate(ruta.borrarCuenta)}>
                Borrar cuenta
              </Button>
              {/* <Button colorScheme="teal" onClick={() => navigate(ruta.home)}>
                {" "}
                Volver
              </Button> */}
            </Stack>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};
