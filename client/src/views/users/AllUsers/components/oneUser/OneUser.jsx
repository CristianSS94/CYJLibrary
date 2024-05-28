import { Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ruta } from "../../../../../routes/data";

export const OneUser = () => {
  const location = useLocation();
  const oneUser = location.state;
  const navigate = useNavigate();
  // if (oneUser) {
  //   console.log(oneUser);
  // }

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
              return (
                <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
                  <Card>
                    <CardHeader>
                      <Heading size="md"> Customer dashboard</Heading>
                    </CardHeader>
                    <CardBody>
                      <Text>View a summary of all your customers over the last month.</Text>
                    </CardBody>
                    <CardFooter>
                      <Button>View here</Button>
                    </CardFooter>
                  </Card>
                </SimpleGrid>
              );
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
