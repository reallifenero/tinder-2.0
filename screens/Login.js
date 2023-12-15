import { View, Text, Button } from "react-native";
import React from "react";
import useAuth from "../hooks/useAuth";
import tw from "tailwind-react-native-classnames";

const Login = () => {
  const { user } = useAuth();
  const { promptAsync } = useAuth();

  return (
    <View style={tw`bg-red-900 justify-center items-center h-full`}>
      <Button
        style={tw`text-red-900 text-lg bg-red-900 py-2 px-5 rounded rounded-lg`}
        onPress={() => promptAsync()}
        title="Login"
      >
        Login
      </Button>
    </View>
  );
};

export default Login;
