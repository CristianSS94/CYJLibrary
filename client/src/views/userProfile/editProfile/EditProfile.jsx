import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEditProfile } from "./hooks/useEditProfile";

export const EditProfile = () => {
  const navigate = useNavigate();
  const { show, handleClick, handleChange, msgError, handleSubmit, editUser } =
    useEditProfile();

  return (
    <Box padding={4}>
      <FormControl isRequired>
        <FormLabel>Nombre</FormLabel>
        <Input
          placeholder="Nombre"
          onChange={handleChange}
          name="user_name"
          value={editUser.user_name}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Apellidos</FormLabel>
        <Input
          placeholder="Apellidos"
          onChange={handleChange}
          name="last_name"
          value={editUser.last_name}
        />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Teléfono</FormLabel>
        <Input
          placeholder="Teléfono"
          onChange={handleChange}
          name="phone_number"
          value={editUser.phone_number}
        />
      </FormControl>
      <FormControl isRequired>
        {/* <FormLabel>Contraseña</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Contraseña"
            onChange={handleChange}
            name="password"
            value={editUser.password}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup> */}
      </FormControl>
      <p>{msgError ? msgError : null}</p>
      <Stack spacing={4} paddingTop={5} direction="row" align="center">
        <Button colorScheme="teal" onClick={handleSubmit}>
          Aceptar
        </Button>
        <Button colorScheme="teal" onClick={() => navigate("/profile")}>
          {" "}
          Cancelar
        </Button>
      </Stack>
    </Box>
  );
};
