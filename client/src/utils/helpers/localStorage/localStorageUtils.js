export const getLocalStorage = (item) => localStorage.getItem(item);

export const saveLocalStorage = (item, data) => localStorage.setItem(item, data);

export const delLocalStorage = (item) => localStorage.removeItem(item);
