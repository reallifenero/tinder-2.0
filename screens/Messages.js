import { View, Text, SafeAreaView } from "react-native";
import React from "react";

import Header from "../components/Header";

const Messages = () => {
  return (
    <SafeAreaView>
      <Header title="Message" callEnabled />
      <Text>Messages</Text>
    </SafeAreaView>
  );
};

export default Messages;
