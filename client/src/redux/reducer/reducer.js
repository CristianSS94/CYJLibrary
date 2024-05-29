const initialState = {
  isLoggedIn: false,
  user: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case "UPDATE_USER":
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    default:
      return state;
  }
};

const initialCategories = {
  categories: null,
};

export const categoriesReducer = (state = initialCategories, action) => {
  switch (action.type) {
    case "UPDATE_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
};

const initialAllUsers = {
  allUsers: null,
};

export const allUsersReducer = (state = initialAllUsers, action) => {
  switch (action.type) {
    case "UPDATE_ALLUSERS":
      return {
        ...state,
        allUsers: action.payload,
      };
    default:
      return state;
  }
};
