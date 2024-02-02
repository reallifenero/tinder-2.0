import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { collection, onSnapshot, query, where } from "@firebase/firestore";
import tw from "tailwind-react-native-classnames";
import { db } from "../utils/firebase";
import useAuth from "../hooks/useAuth";

// components
import ChatRow from "./ChatRow";

function ChatList() {
  const [matches, setMatches] = useState();
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

    console.log(matches);
    return unsubscribe;
  }, []);

  return matches.length > 0 ? (
    <FlatList
      style={tw`px-2`}
      data={matches}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ChatRow matchDetails={item} />}
    >
      <Text>ChatList</Text>
    </FlatList>
  ) : (
    <View style={tw`p-5`}>
      <Text style={tw`text-center text-lg`}>
        Nobody seems to be interested in you at the moment. Try again sometime!
      </Text>
    </View>
  );
}

export default ChatList;
