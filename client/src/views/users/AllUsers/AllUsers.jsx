import { Box, Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { useAllUsers } from "./hook/useAllUsers";

import { Input } from "@chakra-ui/react";

export const AllUsers = () => {
  const { allUsersFiltered, searchUser, goToProfile, handleChangue } = useAllUsers();

  return (
    <Box sx={{ padding: "1rem" }}>
      <Input onChange={handleChangue} value={searchUser} sx={{ marginBottom: "1rem" }} placeholder="Buscar usuario" />
      <Box sx={{ display: "flex", gap: "0.5rem" }}>
        {allUsersFiltered && allUsersFiltered.length > 0 ? (
          allUsersFiltered.map((elem) => {
            return (
              <Card maxW="xs" key={elem.user_id} bg={"teal.400"}>
                <CardBody>
                  <Image
                    src={elem.img === null ? "/images/users/usuario_defecto.png" : `${elem.img}`}
                    alt="Green double couch with wooden legs"
                    borderRadius="lg"
                  />
                  <Stack mt="6" spacing="3">
                    <Heading size="md">
                      {elem.user_name} {elem.last_name}
                    </Heading>
                    <Text>Biblioteca: {elem.books.length} libros</Text>
                  </Stack>
                </CardBody>
                <CardFooter>
                  <Button variant="solid" colorScheme="blue" onClick={() => goToProfile(elem)}>
                    Ver más
                  </Button>
                </CardFooter>
              </Card>
            );
          })
        ) : (
          <p>No hay resultados</p>
        )}
      </Box>
    </Box>
  );
};
