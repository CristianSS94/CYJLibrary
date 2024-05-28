//Logar al usuario
export const login = (userData) => ({
  type: "LOGIN",
  payload: userData,
});

//Deslogar al usuario
export const logout = () => ({
  type: "LOGOUT",
});

//Actualizar datos del usuario
export const updateUser = (userData) => ({
  type: "UPDATE_USER",
  payload: userData,
});

export const updateCategories = (categoriesData) => ({
  type: "UPDATE_CATEGORIES",
  payload: categoriesData,
});
