import React from "react";
import tw from "tailwind-react-native-classnames";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/core";

import useAuth from "../hooks/useAuth";

const Home = () => {
  const { signOutWithGoogle } = useAuth();
  const navigation = useNavigation();

  return (
    <View style={tw`p-5 justify-center items-center h-full`}>
      <Text>I am the Home Screen</Text>
      <Button
        title="Go to chat screen"
        onPress={() => navigation.navigate("Chat")}
      />
      <Button title="Logout" onPress={() => signOutWithGoogle()} />
    </View>
  );
};

export default Home;
