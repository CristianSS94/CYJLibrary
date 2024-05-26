import React, { useState } from "react";

export const useEditProfile = () => {
  const [show, setShow] = useState(false);
  const [msgError, setMsgError] = useState("");
  const handleClick = () => setShow(!show);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...register, [name]: value });
  };

  return { show, handleClick, handleChange, msgError };
};
