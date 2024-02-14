import { View, Text, Image } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";

const ReceiverMessage = ({ message }) => {
  return (
    <View
      style={[tw`flex flex-row justify-between`, { alignSelf: "flex-start" }]}
    >
      <Image
        style={tw`h-12 w-12 rounded-full mr-2`}
        source={{
          uri: message.photoURL,
        }}
      />
      <View
        style={[
          tw`bg-red-800 rounded rounded-tl-none px-5 py-3 my-2 w-4/5 max-w-sm text-gray-100 text-sm capitalize`,
          { maxWidth: "150px" },
        ]}
      >
        <Text style={tw`text-white`}>{message.message}</Text>
      </View>
    </View>
  );
};

export default ReceiverMessage;
