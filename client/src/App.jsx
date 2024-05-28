import React, { useEffect } from "react";

import { RoutesBooks } from "./routes/RoutesBooks";
import { useApp } from "./hooks/useApp";
import { ChakraProvider } from "@chakra-ui/react";

const App = () => {
  const { dispatch, getAllCategories, getTokenUser } = useApp();

  useEffect(() => {
    getTokenUser();
    getAllCategories();
  }, [dispatch]);

  return (
    <ChakraProvider>
      <RoutesBooks />
    </ChakraProvider>
  );
};

export default App;
