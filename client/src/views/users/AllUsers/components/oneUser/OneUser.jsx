import { Box, Button, Card, CardBody, CardHeader, Heading, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ruta } from "../../../../../routes/data";

export const OneUser = () => {
  const location = useLocation();
  const oneUser = location.state;
  const navigate = useNavigate();

  return (
    <>
      <Card>
        <CardHeader>
          <Heading size="md">{oneUser?.user_name}</Heading>
        </CardHeader>
        <CardBody>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Telefóno
            </Heading>
            <Text pt="2" fontSize="sm">
              {oneUser?.phone_number ? oneUser?.phone_number : "No ha añadido ningún número de Telefóno"}
            </Text>
            <Stack spacing={4} paddingTop={5} direction="row" align="center">
              <Button colorScheme="teal">Contactar</Button>
              <Button colorScheme="teal" onClick={() => navigate(ruta.usuarios)}>
                {" "}
                Volver
              </Button>
            </Stack>
          </Box>
        </CardBody>
      </Card>
    </>
  );
};
