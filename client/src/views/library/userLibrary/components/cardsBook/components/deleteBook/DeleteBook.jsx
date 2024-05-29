import { DeleteIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useRef } from "react";
import { useGetUser } from "../../../../../../../hooks/useGetUser";

export const DeleteBook = ({ elem }) => {
  const { getDataUser } = useGetUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

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

  return (
    <>
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
    </>
  );
};
