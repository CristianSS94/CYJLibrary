import React from "react";
import {
  Box,
  Button,
  CardHeader,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useEditProfile } from "./hooks/useEditProfile";
import { useNavigate } from "react-router-dom";

export const EditProfile = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const { show, handleClick, handleChange, msgError } = useEditProfile();

  return (
    <Box padding={4}>
      {/* <CardHeader>
        <Heading size="md">Modificar datos</Heading>
      </CardHeader> */}
      <FormControl isRequired>
        <FormLabel>Nombre</FormLabel>
        <Input
          placeholder="Nombre"
          onChange={handleChange}
          name="name"
          value={user.user_name}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Apellidos</FormLabel>
        <Input
          placeholder="Apellidos"
          onChange={handleChange}
          name="lastName"
          value={user.last_name}
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
            value={user.password}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      {/* <FormControl isRequired>
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
      </FormControl> */}
      <p>{msgError ? msgError : null}</p>
      <Stack spacing={4} paddingTop={5} direction="row" align="center">
        <Button colorScheme="teal" /*onClick={handleSubmit}*/>Aceptar</Button>
        <Button colorScheme="teal" onClick={() => navigate("/profile")}>
          {" "}
          Cancelar
        </Button>
      </Stack>
    </Box>
  );
};
