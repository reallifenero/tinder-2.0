import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import tw from "tailwind-react-native-classnames";

import Header from "../components/Header";

const Messages = () => {
  return (
    <SafeAreaView>
      <Header title="Message" callEnabled />
      <View style={tw`p-5`}>Messages</View>
    </SafeAreaView>
  );
};

export default Messages;
