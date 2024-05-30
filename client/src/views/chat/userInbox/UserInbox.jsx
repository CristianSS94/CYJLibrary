import { Box, Button, Card } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

export const UserInbox = () => {
  const allUsers = useSelector((state) => state.getAllUsers.allUsers);
  const user = useSelector((state) => state.auth.user);
  console.log(allUsers);
  console.log(user);

  const nameUserRecipient = (id) => {
    const nameRecipient = allUsers.find((e) => e.user_id === id);
    return nameRecipient ? `${nameRecipient.user_name} ${nameRecipient.last_name}` : "Desconocido";
  };

  return (
    <Box>
      <h1>Mis chats</h1>
      <Box>
        <h6>Chat Iniciados</h6>
        <Card>
          {user?.ChatsInitiador.map((chat) => {
            return <div>Chat con {nameUserRecipient(chat.recipient_id)}</div>;
          })}
          <Button>Abrir Chat</Button>
        </Card>
      </Box>
      <Box>
        <h6>Chat Recibidos</h6>
        {user?.ChatsRecipient.map((chat) => {
          return <div>Chat con {nameUserRecipient(chat.initiador_id)}</div>;
        })}
        <Button>Abrir Chat</Button>
      </Box>
    </Box>
  );
};
