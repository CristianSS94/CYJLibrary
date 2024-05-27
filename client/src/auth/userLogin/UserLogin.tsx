import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Stack } from "@chakra-ui/react";
import React from "react";
import { useUserLogin } from "./hooks/useUserLogin";

export const UserLogin = () => {
  const { handleClick, loginData, msgError, navigate, show, handleChange, handleSubmit } = useUserLogin();

  return (
    <Box padding={4}>
      <FormControl isRequired>
        <FormLabel>Correo electrónico</FormLabel>
        <Input type="email" onChange={handleChange} name="email" value={loginData.email} placeholder="Ejemplo: hola@mail.com" />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Contraseña</FormLabel>
        <InputGroup size="md">
          <Input pr="4.5rem" type={show ? "text" : "password"} placeholder="Contraseña" onChange={handleChange} name="password" value={loginData.password} />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <p>{msgError ? msgError : null}</p>
      <Stack spacing={4} paddingTop={5} direction="row" align="center">
        <Button colorScheme="teal" onClick={handleSubmit}>
          Aceptar
        </Button>
        <Button colorScheme="teal" onClick={() => navigate("/")}>
          {" "}
          Cancelar
        </Button>
      </Stack>
    </Box>
  );
};
