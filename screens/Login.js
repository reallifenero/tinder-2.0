import { View, Text, Pressable } from "react-native";
import React from "react";
import useAuth from "../hooks/useAuth";
import tw from "tailwind-react-native-classnames";

const Login = () => {
  const { signInWithGoogle, request } = useAuth();

  return (
    <View style={tw`bg-red-500 justify-center items-center h-full`}>
      <Pressable
        disabled={!request}
        style={tw`bg-gray-100 uppercase py-4 px-10 rounded-full`}
        onPress={() => signInWithGoogle()}
      >
        <Text style={tw`uppercase text-red-400 font-bold`}>
          Login with google
        </Text>
      </Pressable>
    </View>
  );
};

export default Login;
