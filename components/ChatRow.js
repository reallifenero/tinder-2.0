import { View, Text } from "react-native";
import React from "react";

import useAuth from "../hooks/useAuth";

function ChatRow({ matchDetails }) {
  console.log(matchDetails);
  const { user } = useAuth();

  return (
    <View>
      <Text>{matchDetails[0]}</Text>
      <Text>ChatRow</Text>
      <Text>ChatRow</Text>
    </View>
  );
}

export default ChatRow;
