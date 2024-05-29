import { Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ruta } from "../../../../../routes/data";
import { CardsBooks } from "../../../../library/userLibrary/components/cardsBook/CardsBooks";

export const OneUser = () => {
  const location = useLocation();
  const oneUser = location.state;
  const navigate = useNavigate();

  return (
    <>
      <Card>
        <CardHeader>
          <Heading size="md">
            {oneUser?.user_name} {oneUser?.last_name}
          </Heading>
          <Stack spacing={4} paddingTop={5} direction="row" align="center">
            <Button colorScheme="teal">Contactar</Button>
            <Button colorScheme="teal" onClick={() => navigate(ruta.usuarios)}>
              {" "}
              Volver
            </Button>
          </Stack>
        </CardHeader>
        <CardBody>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Telefóno
            </Heading>
            <Text pt="2" fontSize="sm">
              {oneUser?.phone_number ? oneUser?.phone_number : "No ha añadido ningún número de Telefóno"}
            </Text>
          </Box>
        </CardBody>
        <CardFooter>
          {oneUser && oneUser.books.length > 0 ? (
            oneUser.books.map((elem) => {
              return <CardsBooks elem={elem} hasDeleteButton={false} />;
            })
          ) : (
            <Box>
              <Heading size="xs" textTransform="uppercase">
                Libros
              </Heading>
              <Text pt="2" fontSize="sm">
                No ha añadido ningún libro
              </Text>
            </Box>
          )}
        </CardFooter>
      </Card>
    </>
  );
};
