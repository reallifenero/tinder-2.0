import { View, Text, Image } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";

const SenderMessage = ({ message }) => {
  return (
    <View
      style={[
        tw`items-start flex flex-row justify-center my-2 mr-5`,
        { alignSelf: "flex-start", marginLeft: "auto" },
      ]}
    >
      <View
        style={tw`bg-purple-600 rounded-lg  rounded-tr-none w-4/5 px-5 py-3 mx-3`}
      >
        <Text style={tw`text-white text-sm capitalize`}>{message.message}</Text>
      </View>
      <Image
        style={tw`h-12 w-12 rounded-full`}
        source={{
          uri: message.photoURL,
        }}
      />
    </View>
  );
};

export default SenderMessage;
