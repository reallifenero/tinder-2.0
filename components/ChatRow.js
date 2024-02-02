import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import tw from "tailwind-react-native-classnames";

import useAuth from "../hooks/useAuth";
import getMatchedUserInfo from "../utils/getMatchedUserInfo";

function ChatRow({ matchDetails }) {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [matchedUserInfo, setMatchedUserInfo] = useState(null);

  useEffect(() => {
    setMatchedUserInfo(getMatchedUserInfo(matchDetails.users, user.uid));
  }, [user, matchDetails]);
  return (
    <TouchableOpacity
      style={[
        tw`flex-row items-center py-3 px-5 bg-white mx-3 my-1 rounded-lg shadow-md`,
        styles.cardShadow,
      ]}
      onPress={() => navigation.navigate("Messages", { matchDetails })}
    >
      <Image
        style={tw`rounded-full h-16 w-16 mr-4`}
        source={{ uri: matchedUserInfo?.photoURL }}
      />
      <View>
        <Text style={tw`font-medium text-lg`}>
          {matchedUserInfo?.displayName}
        </Text>
        <Text>Say Hi! 👋🏾 </Text>
      </View>
    </TouchableOpacity>
  );
}

export default ChatRow;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpactiy: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
