import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import tw from "tailwind-react-native-classnames";

import Header from "../components/Header";

const Messages = () => {
  return (
    <SafeAreaView>
      <Header title="Message" callEnabled />
      <View style={tw`p-5`}>
        <Text style={tw`shadow-md p-2 bg-gray-100 rounded-xl w-60 h-10`}>
          Messages
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Messages;
