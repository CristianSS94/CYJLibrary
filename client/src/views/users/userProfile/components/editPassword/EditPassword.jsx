import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Stack } from "@chakra-ui/react";
import React from "react";

import { useEditPassword } from "./hooks/useEditPassword";
import { ruta } from "../../../../../routes/data";

export const EditPassword = () => {
  const {
    userPassword,
    verifyPassword,
    newPassword,
    show,

    handleClick,
    handleChange,
    handleChangeNew,
    handleSubmitPassword,
    handleSubmitNewPassword,
    navigate,
  } = useEditPassword();

  return (
    <>
      {!verifyPassword ? (
        <Box padding={4}>
          <FormControl isRequired>
            <FormLabel>Introduce tu contraseña</FormLabel>
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
          <FormControl isRequired>
            <FormLabel>Nueva contraseña</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Nueva contraseña"
                onChange={handleChangeNew}
                name="password"
                value={newPassword.password}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Repite la nueva contraseña</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                placeholder="Repite la Contraseña"
                onChange={handleChangeNew}
                name="password2"
                value={newPassword.password2}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <Stack spacing={4} paddingTop={5} direction="row" align="center">
            <Button colorScheme="teal" onClick={handleSubmitNewPassword}>
              Aceptar
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
