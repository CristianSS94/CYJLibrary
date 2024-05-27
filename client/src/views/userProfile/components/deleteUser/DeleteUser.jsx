import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { ruta } from "../../../../routes/routesClient";
import { useDispatch } from "react-redux";
import { logout } from "../../../../redux/actions";
import { delLocalStorage } from "../../../../helpers/localStorageUtils";

export const DeleteUser = () => {
  //Traigo al usuario logado
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const initialPassword = {
    password: "",
  };

  const [userPassword, setUserPassword] = useState(initialPassword);

  //Estado que permite borrar la cuenta
  const [verifyPassword, setVerifyPassword] = useState(false);

  //Estado que maneja ver las contraseñas
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const deleteUser = () => {
    axios
      .delete(`http://localhost:3000/users/deleteuser/${user.user_id}`, userPassword)
      .then((res) => {
        dispatch(logout());
        navigate(ruta.home);
        delLocalStorage("token");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const navigate = useNavigate();

  //Funcion que controla el input de la contraseña actual
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserPassword({ ...userPassword, [name]: value });
  };

  //Funcion que comprueba con el back la contraseña
  const handleSubmitPassword = () => {
    axios
      .put(`http://localhost:3000/users/verifypassword/${user.user_id}`, userPassword)
      .then((res) => {
        setVerifyPassword(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
