import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { urlBooks } from "../../routes/data/routesServer/routesServer";
import { Box, Card } from "@chakra-ui/react";
import { CardsBooks } from "../library/userLibrary/components/cardsBook/CardsBooks";
import { updateAllBooks } from "../../redux/actions/actions";

export const PrivateHome = () => {
  const allBooks = useSelector((state) => state.getAllBooks.allBooks);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  console.log(allBooks);

  const getAllBooksData = () => {
    axios
      .get(`${urlBooks}/getallbooks/${user.user_id}`)
      .then((res) => {
        console.log(res.data);
        dispatch(updateAllBooks(res.data));
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllBooksData();
  }, []);

  return (
    <Box sx={{ display: "flex", padding: "1rem", gap: "1rem", flexWrap: "wrap" }}>
      {allBooks &&
        allBooks.map((elem) => {
          return <CardsBooks key={elem.book_id} elem={elem} hasDeleteButton={false} />;
        })}
    </Box>
  );
};
