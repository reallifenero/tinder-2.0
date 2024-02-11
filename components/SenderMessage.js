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
      <Image
        style={tw`h-12 w-12 rounded-full absolute top-0 left-14`}
        source={
          {
            // uri: message,
          }
        }
      />
      <Text style={tw`text-white`}>{message}</Text>
    </View>
  );
};

export default SenderMessage;
