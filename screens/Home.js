import tw from "tailwind-react-native-classnames";
import { View, Text, Button } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/core";

const Home = () => {
  const navigation = useNavigation();

  return (
    <View style={tw`p-5 justify-center`}>
      <Text>I am the Home Screen</Text>
      <Button
        title="Go to chat screen"
        onPress={() => navigation.navigate("Chat")}
      />
    </View>
  );
};

export default Home;
