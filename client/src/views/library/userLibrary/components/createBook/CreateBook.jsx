import { Box, Button, FormControl, FormLabel, Input, Select, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { ruta } from "../../../../../routes/data";
import { useCreateBook } from "./hook/useCreateBook";

export const CreateBook = () => {
  const { categories, registerBook, registerError, navigate, handleChange, handleSubmit } = useCreateBook();

  return (
    <Box padding={4}>
      <FormControl isRequired>
        <FormLabel>Titulo</FormLabel>
        <Input placeholder="Título del libro" onChange={handleChange} name="title" value={registerBook.title} />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Autor</FormLabel>
        <Input placeholder="Apellidos" onChange={handleChange} name="author" value={registerBook.author} />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Descripción</FormLabel>
        <Input onChange={handleChange} name="description" value={registerBook.description} placeholder="Descripción del libro" />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Categoría</FormLabel>
        <Select name="category_id" value={registerBook.category_id} placeholder="Selecciona una categoría" onChange={handleChange}>
          {categories.map((elem) => (
            <option key={elem.category_id} value={elem.category_id}>
              {elem.category_name}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Año de publicación</FormLabel>
        <Input onChange={handleChange} name="year_published" value={registerBook.year_published} placeholder="Año de publicación" />
      </FormControl>
      <Text sx={{ color: "red", fontWeight: "bold" }}>{registerError ? registerError : null}</Text>
      <Stack spacing={4} paddingTop={5} direction="row" align="center">
        <Button colorScheme="teal" onClick={handleSubmit}>
          Aceptar
        </Button>
        <Button colorScheme="teal" onClick={() => navigate(ruta.biblioteca)}>
          {" "}
          Cancelar
        </Button>
      </Stack>
    </Box>
  );
};
