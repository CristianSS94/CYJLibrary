import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ruta } from "../../../routes/data";
import { useGetDataUser } from "../../../utils";

export const UserLibrary = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const categories = useSelector((state) => state.getCategories.categories);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const { getDataUser } = useGetDataUser();

  // const initialBookData = {
  //   user_id: user?.user_id,
  //   title: "",
  //   author: "",
  //   description: "",
  //   category_id: "",
  //   year_published: "",
  // };
  // const [editedBook, setEditedBook] = useState(initialBookData);
  // const [error, setError] = useState("");

  const getNameCategory = (category_id) => {
    const category = categories.find((category) => category.category_id === category_id);

    return category.category_name;
  };

  const deleteBook = (book_id) => {
    axios
      .delete(`http://localhost:3000/books/delete/${book_id}`)
      .then((res) => {
        getDataUser();
        onClose();
      })
      .catch((err) => {
        console.error("Error al eliminar el libro:", err);
      });
  };

  //EDITAR Libro

  // const handleEdit = (book) => {
  //   setEditedBook(book);
  //   onOpen();
  // };

  // const handleSaveEdit = () => {
  //   // Aquí deberías hacer la llamada para guardar los cambios
  //   // No olvides manejar la lógica para cerrar el diálogo, actualizar los datos, etc.
  //   console.log("Guardar cambios:", editedBook);
  //   onClose();
  // };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setEditedBook({ ...editedBook, [name]: value });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await onSave(bookId, editedBook);
  //   } catch (error) {
  //     setError("Error al editar el libro");
  //   }
  // };

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
            <Card key={elem.book_id} width={{ xl: "32%" }}>
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
                <DeleteIcon onClick={onOpen} sx={{ cursor: "pointer" }} />
                <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Eliminar Libro
                      </AlertDialogHeader>
                      <AlertDialogBody>¿Está seguro? No puedes deshacer esta acción.</AlertDialogBody>
                      <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                          Cancelar
                        </Button>
                        <Button colorScheme="red" onClick={() => deleteBook(elem.book_id)} ml={3}>
                          Eliminar
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog>

                <EditIcon />
                {/* <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
                  <AlertDialogOverlay>
                    <AlertDialogContent>
                      <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Editar Libro
                      </AlertDialogHeader>
                      <AlertDialogBody>
                        <form onSubmit={handleSubmit}>
                          <input type="text" name="title" value={editedBook.title} onChange={handleChange} placeholder="Título" required />
                          <input type="text" name="author" value={editedBook.author} onChange={handleChange} placeholder="Autor" required />
                          <input type="text" name="description" value={editedBook.description} onChange={handleChange} placeholder="Descripción" required />
                          <input type="text" name="category_id" value={editedBook.category_id} onChange={handleChange} placeholder="ID de categoría" required />
                          <input
                            type="text"
                            name="year_published"
                            value={editedBook.year_published}
                            onChange={handleChange}
                            placeholder="Año de publicación"
                            required
                          />
                          {error && <p>{error}</p>}
                        </form>
                      </AlertDialogBody>
                      <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                          Cancelar
                        </Button>
                        <Button colorScheme="red" onClick={() => deleteBook(elem.book_id)} ml={3}>
                          Eliminar
                        </Button>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialogOverlay>
                </AlertDialog> */}
              </CardFooter>
            </Card>
          ))
        ) : (
          <Text>Aun no has añadido ningún libro a la biblioteca</Text>
        )}
      </Box>
    </Box>
  );
};
