import React, { useEffect } from "react";
import { RoutesBooks } from "./routes/RoutesBooks";
import { ChakraProvider } from "@chakra-ui/react";
import { useGetAllUsers, useGetCategories, useGetToken } from "./hooks";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const { getTokenUser } = useGetToken();
  const { getAllCategories } = useGetCategories();
  const { getAllUsersData } = useGetAllUsers();

  useEffect(() => {
    getTokenUser();
    getAllCategories();
    getAllUsersData();
  }, [dispatch]);

  return (
    <ChakraProvider>
      <RoutesBooks />
    </ChakraProvider>
  );
};

export default App;
