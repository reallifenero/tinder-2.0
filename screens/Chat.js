import { View, Text } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";

const Chat = () => {
  return (
    <View style={tw`justify-center items-center h-full bg-red-700`}>
      <Text style={tw`text-white font-bold text-lg`}>Chat</Text>
    </View>
  );
};

export default Chat;
