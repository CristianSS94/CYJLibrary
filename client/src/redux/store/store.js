import { configureStore } from "@reduxjs/toolkit";
import { allBooksReducer, allUsersReducer, authReducer, categoriesReducer } from "../reducer/reducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    getCategories: categoriesReducer,
    getAllUsers: allUsersReducer,
    getAllBooks: allBooksReducer,
  },
});
