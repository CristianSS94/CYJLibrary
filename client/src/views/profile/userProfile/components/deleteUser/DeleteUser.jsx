import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Stack } from "@chakra-ui/react";
import React from "react";

import { ruta } from "../../../../../routes/data";
import { useDeleteUser } from "./hooks/useDeleteUser";

export const DeleteUser = () => {
  const { userPassword, verifyPassword, show, handleChange, handleClick, handleSubmitPassword, deleteUser, navigate } = useDeleteUser();

  return (
    <>
      {!verifyPassword ? (
        <Box padding={4}>
          <FormControl isRequired>
            <FormLabel>Introduzca su contraseña</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Contraseña actual"
                onChange={handleChange}
                name="password"
                value={userPassword.password}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Stack spacing={4} paddingTop={5} direction="row" align="center">
            <Button colorScheme="teal" onClick={handleSubmitPassword}>
              Aceptar
            </Button>
            <Button colorScheme="teal" onClick={() => navigate(ruta.perfil)}>
              {" "}
              volver
            </Button>
          </Stack>
        </Box>
      ) : (
        <Box padding={4}>
          <Stack spacing={4} paddingTop={5} direction="row" align="center">
            <Button colorScheme="teal" onClick={deleteUser}>
              Borrar mi cuenta
            </Button>
            <Button colorScheme="teal" onClick={() => navigate(ruta.perfil)}>
              {" "}
              Cancelar
            </Button>
          </Stack>
        </Box>
      )}
    </>
  );
};
