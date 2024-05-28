import { Box, Button, Card, CardBody, CardFooter, Heading, Image, Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAllUsers } from "./hook/useAllUsers";
import { Spinner } from "@chakra-ui/react";

import { Input } from "@chakra-ui/react";

export const AllUsers = () => {
  const { getAllUsersData, allUsersFiltered, goToProfile, handleChangue, searchUser, spinnerActive } = useAllUsers();

  useEffect(() => {
    getAllUsersData();
  }, []);

  return (
    <Box sx={{ padding: "1rem" }}>
      {spinnerActive ? (
        <Spinner />
      ) : (
        <>
          <Input onChange={handleChangue} value={searchUser} sx={{ marginBottom: "1rem" }} placeholder="Buscar usuario" />
          {allUsersFiltered && allUsersFiltered.length > 0 ? (
            allUsersFiltered.map((elem) => {
              return (
                <Card maxW="xs" key={elem.user_id}>
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
        </>
      )}
    </Box>
  );
};
