import React, { useState } from "react";
import { useRoute } from "@react-navigation/core";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from "react-native";
import tw from "tailwind-react-native-classnames";

import Header from "../components/Header";
import useAuth from "../hooks/useAuth";
import getMatchedUserInfo from "../utils/getMatchedUserInfo";

const Messages = () => {
  const { user } = useAuth();
  const { params } = useRoute();
  const [input, setInput] = useState(null);

  const { matchDetails } = params;
  const sendMessage = () => {};

  return (
    <SafeAreaView>
      <Header
        title={getMatchedUserInfo(matchDetails?.users, user.uid).displayName}
        callEnabled
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : height}
        style={tw`flex`}
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback>
          <>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
            <Text style={tw``}>TEXT</Text>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <Text style={tw``}>Messages</Text>

      <View
        style={tw`flex-row justify-between items-center border-t border-gray-200 px-5 py-2`}
      >
        <TextInput
          style={tw`h-20 text-lg shadow-md p-2 bg-gray-100 rounded-xl w-60 h-10`}
          placeholder="Send Message..."
          onChangeText={setInput}
          onSubmitEditing={sendMessage}
          value={input}
        />

        <Button
          onPress={() => sendMessage()}
          title="Send"
          style={{ backgroundColor: "#000a" }}
          color="#FF5864"
        />
      </View>
    </SafeAreaView>
  );
};

export default Messages;
