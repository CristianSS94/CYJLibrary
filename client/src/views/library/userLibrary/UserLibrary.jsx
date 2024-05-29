import { Box, Button, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ruta } from "../../../routes/data";
import { CardsBooks } from "./components/cardsBook/CardsBooks";

export const UserLibrary = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

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
          user.books.map((elem) => <CardsBooks key={elem.book_id} elem={elem} />)
        ) : (
          <Text>Aun no has añadido ningún libro a la biblioteca</Text>
        )}
      </Box>
    </Box>
  );
};
