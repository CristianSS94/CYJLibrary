import React from "react";
import { useSelector } from "react-redux";
import { Card, CardHeader, CardBody, Heading, Stack, StackDivider, Box, Text, Button } from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { ruta } from "../../routes/routesClient";

export const UserProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  return (
    <>
      <Card>
        <CardHeader>
          <Heading size="md">Mis datos</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            <>
              <Heading size="xs" textTransform="uppercase">
                Nombre completo:
              </Heading>
              <Text pt="2" fontSize="sm">
                {user?.user_name} {user?.last_name}
              </Text>
            </>
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
              <Stack spacing={4} paddingTop={5} direction="row" align="center">
                <Button colorScheme="teal" onClick={() => navigate(ruta.editarPerfil)}>
                  Modificar datos
                </Button>
                <Button colorScheme="teal" onClick={() => navigate(ruta.editarPassword)}>
                  Modificar contraseña
                </Button>
                <Button colorScheme="teal" onClick={() => navigate(ruta.borrarCuenta)}>
                  Borrar cuenta
                </Button>
                <Button colorScheme="teal" onClick={() => navigate(ruta.home)}>
                  {" "}
                  Volver
                </Button>
              </Stack>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
};
