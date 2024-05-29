import { EditIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ruta } from "../../../../../../../routes/data";
import { urlBooks } from "../../../../../../../routes/data/routesServer/routesServer";
import { useGetUser } from "../../../../../../../hooks/useGetUser";

export const EditBook = ({ elem }) => {
  const user = useSelector((state) => state.auth.user);
  const categories = useSelector((state) => state.getCategories.categories);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const { getDataUser } = useGetUser();
  const navigate = useNavigate();

  const [editedBook, setEditedBook] = useState(elem);
  const [editError, setEditError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedBook({ ...editedBook, [name]: value });
  };

  const handleSubmit = (book_id) => {
    axios
      .put(`${urlBooks}/edit/${book_id}`, editedBook)
      .then((res) => {
        getDataUser();
        navigate(ruta.biblioteca);
        onClose();
      })
      .catch((err) => {
        console.log(err);
        setEditError("Error al editar el libro");
      });
  };

  return (
    <>
      <EditIcon onClick={onOpen} sx={{ cursor: "pointer" }} />
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Editar Libro
            </AlertDialogHeader>
            <AlertDialogBody>
              <FormControl isRequired>
                <FormLabel>Titulo</FormLabel>
                <Input placeholder="Título del libro" onChange={handleChange} name="title" value={editedBook.title} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Autor</FormLabel>
                <Input placeholder="Apellidos" onChange={handleChange} name="author" value={editedBook.author} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Descripción</FormLabel>
                <Input onChange={handleChange} name="description" value={editedBook.description} placeholder="Descripción del libro" />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Categoría</FormLabel>
                <Select name="category_id" value={editedBook.category_id} placeholder="Selecciona una categoría" onChange={handleChange}>
                  {categories.map((ele) => (
                    <option key={ele.category_id} value={ele.category_id}>
                      {ele.category_name}
                    </option>
                  ))}
                </Select>
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Año de publicación</FormLabel>
                <Input onChange={handleChange} name="year_published" value={editedBook.year_published} placeholder="Año de publicación" />
              </FormControl>
              <Text sx={{ color: "red", fontWeight: "bold" }}>{editError ? editError : null}</Text>
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme="blue" onClick={() => handleSubmit(elem.book_id)} ml={3}>
                Guardar
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
