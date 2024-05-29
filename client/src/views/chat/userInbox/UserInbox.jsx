import { Box, Card, CardHeader, Spinner } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { urlUsers } from "../../../routes/data";

export const UserInbox = () => {
  const [spinnerActive, setSpinnerActive] = useState(false);
  const [allUsersData, setAlluserData] = useState([]);
  const user = useSelector((state) => state.auth.user);
  const allChats = user.Chats1.concat(user.Chats2);

  const getAllUsersData = () => {
    setSpinnerActive(true);
    axios
      .get(`${urlUsers}/getallusers`)
      .then((res) => {
        console.log(res.data);
        setAlluserData(res.data);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setSpinnerActive(false);
      });
  };

  useEffect(() => {
    getAllUsersData();
  }, []);

  return (
    <Box>
      <h1>Mis chats</h1>
      {spinnerActive ? (
        <Spinner />
      ) : (
        <Box>
          {allUsersData &&
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
            })}
        </Box>
      )}
    </Box>
  );
};
