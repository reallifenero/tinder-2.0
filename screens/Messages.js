import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/core";
import {
  View,
  Text,
  Platform,
  SafeAreaView,
  TextInput,
  StyleSheet,
  Button,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  FlatList,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import {
  query,
  addDoc,
  orderBy,
  collection,
  serverTimestamp,
  onSnapshot,
} from "@firebase/firestore";

import Header from "../components/Header";
import SenderMessage from "../components/SenderMessage";
import ReceiverMessage from "../components/ReceiverMessage";

import { db } from "../utils/firebase";
import useAuth from "../hooks/useAuth";
import getMatchedUserInfo from "../utils/getMatchedUserInfo";

const Messages = () => {
  const { user } = useAuth();
  const { params } = useRoute();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      message:
        "this is not the only message on the system. Even if you want to check it twice.",
      userId: "swc9PGjTRke8mLO30I8uEsDWoQI3WZYVr",
      photoURL: "https://cdn.nba.com/headshots/nba/latest/1040x760/202695.png",
    },
    {
      id: 2,
      message:
        "While using the property display: inline-block will wrap the element to prevent the text inside from extending beyond its parent.",
      userId: "WZYVrWfjAYM5t3qxPbQjL62Zedm1",
      photoURL:
        "https://cdn.wrestletalk.com/wp-content/uploads/2024/02/Sasha-Banks-Mercedes-Mone-AEW-logo.jpg",
    },
  ]);

  const { matchDetails } = params;

  useEffect(
    onSnapshot(
      query(collection(db, "matches"), orderBy("timestamp", "desc")),
      (snapshot) => {
        console.log(snapshot);

        setMessages(["message", "message2"]);
      }
    ),
    [db, matchDetails]
  );

  const sendMessage = () => {
    addDoc(collection(db, "matches", matchDetails.id, "messages"), {
      timeStamp: serverTimestamp(),
      userId: user.uid,
      displayName: user.displayName,
      photoURL: matchDetails.users[user.uid].photoURL,
      message: input,
    });

    setInput("");
  };

  return (
    <SafeAreaView style={tw`flex-1`}>
      <Header
        title={getMatchedUserInfo(matchDetails?.users, user.uid).displayName}
        callEnabled
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw`h-5/6`}
        keyboardVerticalOffset={10}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList
            data={messages}
            style={tw`pl-4`}
            keyExtractor={(item) => item.id}
            renderItem={({ item: message }) =>
              message.userId === user.uid ? (
                <SenderMessage key={message.id} message={message} />
              ) : (
                <ReceiverMessage key={message.id} message={message} />
              )
            }
          />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <View
        style={tw`flex-row justify-between items-center border-t border-gray-200 px-5 py-2`}
      >
        <TextInput
          style={tw`h-10 text-base shadow-md rounded-xl bg-gray-100 w-60 px-2`}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
