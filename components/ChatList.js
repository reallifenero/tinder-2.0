import { db } from "../utils/firebase";
import useAuth from "../hooks/useAuth";
import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/core";
import { collection, onSnapshot, query, where } from "@firebase/firestore";

// components
import ChatRow from "./ChatRow";

function ChatList() {
  const [matches, setMatches] = useState([]);
  const navigation = useNavigation();
  const { user } = useAuth();

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "matches"),
        where("usersMatched", "array-contains", user.uid)
      ),
      (snapshot) => {
        setMatches(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      }
    );
    return unsubscribe;
  }, [user]);

  // console.log(matches);
  return matches.length > 0 ? (
    <FlatList
      style={tw`px-2`}
      data={matches}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ChatRow
          matchDetails={item}
          // onPress={navigation.navigate("Messages")}
        />
      )}
    />
  ) : (
    <View style={tw`p-5`}>
      <Text style={tw`text-center text-lg`}>
        Nobody seems to be interested in you at the moment. Try again sometime!
      </Text>
    </View>
  );
}

export default ChatList;
