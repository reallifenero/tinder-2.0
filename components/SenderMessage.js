import { View, Text } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";

const SenderMessage = ({ message }) => {
  return (
    <View
      style={[
        tw`bg-purple-600 rounded-lg rounded-tl-none px-5 px-5 py-3 mx-3 my-2 ml-14`,
        { alignSelf: "flex-start" },
      ]}
    >
      <Text style={tw`text-white`}>{message.message}</Text>
    </View>
  );
};

export default SenderMessage;
