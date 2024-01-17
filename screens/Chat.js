import { SafeAreaView, Text } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import Header from "../components/Header";
import ChatList from "../components/ChatList";

const Chat = () => {
  return (
    <SafeAreaView>
      <Header title="Chat" />
      <ChatList />
    </SafeAreaView>
  );
};

export default Chat;
