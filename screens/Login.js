import { View, Text } from "react-native";
import React from "react";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { user } = useAuth();
  return (
    <View>
      <Text>Login</Text>
    </View>
  );
};

export default Login;
