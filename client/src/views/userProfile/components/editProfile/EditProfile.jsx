import { Box, Button, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useEditProfile } from "./hooks/useEditProfile";
import { ruta } from "../../../../routes/routesBooks";

export const EditProfile = () => {
  const navigate = useNavigate();
  const { handleChange, handleSubmit, editUser } = useEditProfile();

  return (
    <Box padding={4}>
      <FormControl isRequired>
        <FormLabel>Nombre</FormLabel>
        <Input placeholder="Nombre" onChange={handleChange} name="user_name" value={editUser.user_name} />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Apellidos</FormLabel>
        <Input placeholder="Apellidos" onChange={handleChange} name="last_name" value={editUser.last_name} />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Teléfono</FormLabel>
        <Input placeholder="Teléfono" onChange={handleChange} name="phone_number" value={editUser.phone_number} />
      </FormControl>
      <Stack spacing={4} paddingTop={5} direction="row" align="center">
        <Button colorScheme="teal" onClick={handleSubmit}>
          Aceptar
        </Button>
        <Button colorScheme="teal" onClick={() => navigate(ruta.perfil)}>
          {" "}
          Volver
        </Button>
        <Button colorScheme="teal" onClick={() => navigate(ruta.editarPassword)}>
          {" "}
          Modificar la contraseña
        </Button>
      </Stack>
    </Box>
  );
};
