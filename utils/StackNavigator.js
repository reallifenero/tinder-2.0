import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeAreaView from "react-native-safe-area-view";

import React from "react";

import Home from "../screens/Home";
import Chat from "../screens/Chat";
import Login from "../screens/Login";
import Modal from "../screens/Modal";
import Matched from "../screens/Matched.js";

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
          <Stack.Group>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Chat" component={Chat} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen name="Modal" component={Modal} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: "transparentModal" }}>
            <Stack.Screen name="Matched" component={Matched} />
          </Stack.Group>
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
