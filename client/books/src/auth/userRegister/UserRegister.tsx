import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { useUserRegister } from "./hooks/useUserRegister";

export const UserRegister = () => {
  const {
    handleChange,
    handleSubmit,
    navigate,
    register,
    handleClick,
    show,
    msgError,
  } = useUserRegister();

  return (
    <Box padding={4}>
      <FormControl isRequired>
        <FormLabel>Nombre</FormLabel>
        <Input
          placeholder="Nombre"
          onChange={handleChange}
          name="name"
          value={register.name}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Apellidos</FormLabel>
        <Input
          placeholder="Apellidos"
          onChange={handleChange}
          name="lastName"
          value={register.lastName}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Correo electrónico</FormLabel>
        <Input
          type="email"
          onChange={handleChange}
          name="email"
          value={register.email}
          placeholder="Ejemplo: hola@mail.com"
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Confirma el correo electrónico</FormLabel>
        <Input
          type="email"
          onChange={handleChange}
          name="email2"
          value={register.email2}
          placeholder="Ejemplo: hola@mail.com"
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Contraseña</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Contraseña"
            onChange={handleChange}
            name="password"
            value={register.password}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Confirma la contraseña</FormLabel>
        <InputGroup size="md">
          <Input
            onChange={handleChange}
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Contraseña"
            name="password2"
            value={register.password2}
          />
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
