import { View, Text } from "react-native";
import React from "react";
import useAuth from "../hooks/useAuth";
import tw from "tailwind-react-native-classnames";

const Login = () => {
  const { user } = useAuth();
  return (
    <View style={tw`bg-white justify-center items-center h-full`}>
      <Text style={tw`text-white	bg-red-900 py-2 px-5 rounded rounded-lg`}>
        Login
      </Text>
    </View>
  );
};

export default Login;
