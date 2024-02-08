import React from "react";
import { useRoute } from "@react-navigation/core";
import { View, Text, SafeAreaView } from "react-native";
import tw from "tailwind-react-native-classnames";

import Header from "../components/Header";

import useAuth from "../hooks/useAuth";
import getMatchedUserInfo from "../utils/getMatchedUserInfo";

const Messages = () => {
  const { user } = useAuth();
  const { params } = useRoute();

  const { matchDetails } = params;

  console.log(matchDetails);

  return (
    <SafeAreaView>
      <Header
        title={getMatchedUserInfo(matchDetails?.users, user.uid).displayName}
        callEnabled
      />
      <View style={tw`p-5`}>
        <Text style={tw`shadow-md p-2 bg-gray-100 rounded-xl w-60 h-10`}>
          Messages
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Messages;
