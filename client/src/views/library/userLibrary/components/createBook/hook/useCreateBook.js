import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { urlBooks } from "../../../../../../routes/data/routesServer/routesServer";
import { ruta } from "../../../../../../routes/data";
import { useGetDataUser } from "../../../../../../utils/hooks/users/useGetDataUser";

export const useCreateBook = () => {
  const user = useSelector((state) => state.auth.user);
  const categories = useSelector((state) => state.getCategories.categories);
  const navigate = useNavigate();
  const { getDataUser } = useGetDataUser();

  const initialBook = {
    user_id: user?.user_id,
    title: "",
    author: "",
    description: "",
    category_id: "",
    year_published: "",
  };

  const [registerBook, setRegisterBook] = useState(initialBook);
  const [registerError, setRegisterError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterBook({ ...registerBook, [name]: value });
  };

  const handleSubmit = () => {
    const yearPublished = parseInt(registerBook.year_published);

    if (!registerBook.title || !registerBook.author || !registerBook.category_id || isNaN(yearPublished) || yearPublished < 1901 || yearPublished > 2155) {
      setRegisterError("Algun campo está vacío");
    } else {
      axios
        .post(`${urlBooks}/createbook`, registerBook)
        .then((res) => {
          getDataUser();
          navigate(ruta.biblioteca);
        })
        .catch((error) => {
          console.log(error);
          setRegisterError("Error al registrar el libro");
        });
    }
  };

  return { categories, registerBook, registerError, navigate, handleChange, handleSubmit };
};
