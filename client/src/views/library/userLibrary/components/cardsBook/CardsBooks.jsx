import { Box, Card, CardBody, CardFooter, CardHeader, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { DeleteBook } from "./components/deleteBook/DeleteBook";
import { EditBook } from "./components/editBook/EditBook";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { useAllUsers } from "../../../../users/AllUsers/hook/useAllUsers";

export const CardsBooks = ({ elem, hasDeleteButton = true }) => {
  const allUsers = useSelector((state) => state.getAllUsers.allUsers);
  const categories = useSelector((state) => state.getCategories.categories);
  const { goToProfile } = useAllUsers();
  const navigateToProfile = (id) => {
    const profile = allUsers.find((user) => user.user_id === id);
    goToProfile(profile);
  };

  const getNameCategory = (category_id) => {
    const category = categories.find((category) => category.category_id === category_id);

    return category.category_name;
  };

  return (
    <Card bg="teal.100" key={elem.book_id} width={{ xl: "32%" }}>
      <CardHeader>
        <Heading size="md">Título: {elem.title}</Heading>
        <Text>Categoría: {getNameCategory(elem.category_id)}</Text>
        {elem.user?.user_name && (
          <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <Text>Usuario: {elem.user.user_name}</Text>
            <ExternalLinkIcon sx={{ cursor: "pointer" }} onClick={() => navigateToProfile(elem.user_id)} />
          </Box>
        )}
      </CardHeader>
      <CardBody>
        <Text>description{elem.description}</Text>
        <Text>author{elem.author}</Text>
        <Text>year_published{elem.year_published}</Text>
      </CardBody>
      <CardFooter sx={{ display: "flex", justifyContent: "space-evenly" }}>
        {hasDeleteButton && (
          <>
            <DeleteBook elem={elem} />
            <EditBook elem={elem} />
          </>
        )}
      </CardFooter>
    </Card>
  );
};
