import { Card, CardBody, CardFooter, CardHeader, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { DeleteBook } from "./components/deleteBook/DeleteBook";
import { EditBook } from "./components/editBook/EditBook";

export const CardsBooks = ({ elem }) => {
  const categories = useSelector((state) => state.getCategories.categories);

  const getNameCategory = (category_id) => {
    const category = categories.find((category) => category.category_id === category_id);

    return category.category_name;
  };

  return (
    <Card bg="teal.100" key={elem.book_id} width={{ xl: "32%" }}>
      <CardHeader>
        <Heading size="md">{elem.title}</Heading>
        <Text>{getNameCategory(elem.category_id)}</Text>
      </CardHeader>
      <CardBody>
        <Text>{elem.description}</Text>
        <Text>{elem.author}</Text>
        <Text>{elem.year_published}</Text>
      </CardBody>
      <CardFooter sx={{ display: "flex", justifyContent: "space-evenly" }}>
        <DeleteBook elem={elem} />
        <EditBook elem={elem} />
      </CardFooter>
    </Card>
  );
};
