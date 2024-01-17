import { View, Text } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";

const Chat = () => {
  return (
    <View style={tw`justify-between items-center h-full bg-white-700`}>
      <Text style={tw`text-red-600 font-bold text-lg`}>Chat</Text>
    </View>
  );
};

export default Chat;
