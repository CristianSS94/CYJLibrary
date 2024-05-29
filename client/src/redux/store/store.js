import { configureStore } from "@reduxjs/toolkit";
import { allUsersReducer, authReducer, categoriesReducer } from "../reducer/reducer";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    getCategories: categoriesReducer,
    getAllusers: allUsersReducer,
  },
});
