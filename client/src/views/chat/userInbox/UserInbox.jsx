import { Box } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";

export const UserInbox = () => {
  const allUsers = useSelector((state) => state.getAllUsers.allUsers);
  const user = useSelector((state) => state.auth.user);
  console.log(allUsers);
  console.log(user);

  return (
    <Box>
      <h1>Mis chats</h1>
      <Box>
        {/* {allUsersData &&
          (allChats ?? []).map((elem) => {
            const user1 = allUsersData.find((user) => user.user_id === elem.user1_id);
            const user2 = allUsersData.find((user) => user.user_id === elem.user2_id);
            if (!user1 || !user2) return null;
            const otherUser = user1.user_id === user.user_id ? user2 : user1;
            return (
              <Card key={elem.chat_id}>
                <CardHeader> chat con {otherUser.user_name}</CardHeader>
                <Text>{elem}</Text>
              </Card>
            );
          })} */}
      </Box>
    </Box>
  );
};
