import { Box, Button, Card, CardBody, CardHeader, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ruta } from "../../../routes/data";

export const UserLibrary = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const categories = useSelector((state) => state.getCategories.categories);

  const getNameCategory = (category_id) => {
    const category = categories.find((category) => category.category_id === category_id);

    return category.category_name;
  };

  return (
    <Box sx={{ padding: "1rem" }}>
      <Box>
        <Heading size="lg" sx={{ marginBottom: "1rem", display: "flex", gap: "0.5rem" }}>
          <Text>Mi Biblioteca</Text>
          <Button colorScheme="teal" onClick={() => navigate(ruta.subirLibro)}>
            Añadir libro
          </Button>
        </Heading>
      </Box>
      <Box sx={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        {user && user.books.length > 0 ? (
          user.books.map((elem) => (
            // <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))" key={elem.book_id}>
            <Card key={elem.book_id}>
              <CardHeader>
                <Heading size="md">{elem.title}</Heading>
                <Text>{getNameCategory(elem.category_id)}</Text>
              </CardHeader>
              <CardBody>
                <Text>{elem.description}</Text>
                <Text>{elem.author}</Text>
                <Text>{elem.year_published}</Text>
              </CardBody>
            </Card>
            // </SimpleGrid>
          ))
        ) : (
          <Text>Aun no has añadido ningún libro a la biblioteca</Text>
        )}
      </Box>
    </Box>
  );
};
