import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeAreaView from "react-native-safe-area-view";

import React from "react";

import Home from "../screens/Home";
import Chat from "../screens/Chat";
import Login from "../screens/Login";

import useAuth from "../hooks/useAuth";

const StackNavigator = () => {
  const Stack = createStackNavigator();
  const { user } = useAuth();

  return (
    // <SafeAreaProvider>
    //   <SafeAreaView>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Chat" component={Chat} />
        </>
      ) : (
        <Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
    //   </SafeAreaView>
    // </SafeAreaProvider>
  );
};

export default StackNavigator;
