import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import tw from "tailwind-react-native-classnames";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from "firebase/firestore";
import Swiper from "react-native-deck-swiper";
import { useNavigation } from "@react-navigation/core";
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";

import useAuth from "../hooks/useAuth";
import DATA from "../utils/data";
import { db } from "../utils/firebase";
import generateId from "../utils/generateId";

function Home() {
  const { signOutWithGoogle, user } = useAuth();
  const [profiles, setProfiles] = useState([]);
  const navigation = useNavigation();
  const swipeRef = useRef(null);

  useLayoutEffect(
    () =>
      onSnapshot(doc(db, "users", user.uid), (snapshot) => {
        if (snapshot._document === null) {
          navigation.navigate("Modal");
        }
      }),
    []
  );

  useEffect(() => {
    let unsub;

    const fetchCards = async () => {
      const passes = await getDocs(
        collection(db, "users", user.uid, "passes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const swipes = await getDocs(
        collection(db, "users", user.uid, "swipes")
      ).then((snapshot) => snapshot.docs.map((doc) => doc.id));

      const passedUserIds = passes.length > 0 ? passes : ["test"];
      const swipedUserIds = swipes.length > 0 ? swipes : ["test"];

      unsub = onSnapshot(
        query(
          collection(db, "users"),
          where("id", "not-in", [...passedUserIds])
        ),
        (snapshot) => {
          setProfiles(
            snapshot.docs
              .filter((doc) => doc.id !== user.uid)
              .map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
          );
        }
      );
    };

    fetchCards();
    return unsub;
  });

  async function swipeLeft(cardIndex) {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    console.log(`You swiped PASS on ${userSwiped.displayName}`);

    setDoc(doc(db, "users", user.uid, "passes", userSwiped.id), userSwiped);
  }

  async function swipeRight(cardIndex) {
    if (!profiles[cardIndex]) return;

    const userSwiped = profiles[cardIndex];
    const loggedInProfile = await (await getDoc(db, "users", user.uid)).data();

    console.log(`You swiped on ${userSwiped.displayName}`);
    // check if a user swiped on you

    getDoc(doc(db, "users", userSwiped.id, "swipes", user.uid)).then(
      (documentSnapshot) => {
        if (documentSnapshot.exists()) {
          // user has matched with you before you matched with them...
          // create a MATCH!
          console.log(`Hooray, You MATCHED with ${userSwiped.displayName}`);

          setDoc(
            doc(db, "users", user.uid, "swipes", userSwiped.id),
            userSwiped
          );

          // CREATE A MATCH!!
          setDoc(doc(db, "matches", generateId(user.uid, userSwiped.id)), {
            users: {
              [user.uid]: loggedInProfile,
              [userSwiped.id]: userSwiped,
            },
            usersMatched: [user.uid, userSwiped.id],
            timestamp: serverTimestamp(),
          });

          navigation.navigate("Match", {
            loggedInProfile,
            userSwiped,
          });
        } else {
          // user has swiped / didn't get swiped on
          console.log(`You Swiped on ${userSwiped.displayName}`);
        }
      }
    );
  }

  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`z-10 flex-row items-center justify-between px-5`}>
        <TouchableOpacity onPress={() => signOutWithGoogle()}>
          <Image
            source={{ uri: user && user.photoURL }}
            style={{ height: 30, width: 30, borderRadius: 100 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Modal")}>
          <Image
            source={require("../assets/icon.png")}
            style={{ height: 40, width: 40, borderRadius: 100 }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={tw``}
          onPress={() => navigation.navigate("Chat")}
        >
          <Ionicons name="chatbubbles-sharp" size={32} color="black" />
        </TouchableOpacity>
      </View>

      <View style={tw`flex-1 -mt-6`}>
        <Swiper
          cards={profiles}
          stackSize={5}
          cardIndex={0}
          ref={swipeRef}
          animateCardOpacity
          horizontalSwipe
          verticalSwipe={false}
          onSwipedLeft={(cardIndex) => {
            swipeLeft(cardIndex);
          }}
          onSwipedRight={(cardIndex) => {
            swipeRight(cardIndex);
          }}
          overlayLabels={{
            left: {
              title: "NOPE!",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "YEP!",
              style: {
                label: {
                  color: "#4DED30",
                },
              },
            },
          }}
          containerStyle={{ backgroundColor: "transparent" }}
          renderCard={(card, index) =>
            card ? (
              <View key={index} style={tw`relative bg-white h-3/4 rounded-xl`}>
                <Image
                  style={tw`absolute top-0 h-full w-full rounded-xl`}
                  source={{ uri: card.photoURL }}
                />
                <View
                  style={tw`absolute bottom-0 bg-white w-full h-20 
                flex-row items-center justify-between p-3 shadow-md rounded-xl`}
                >
                  <View>
                    <Text style={tw`text-xl font-bold`}>
                      {card.displayName}
                    </Text>
                    <Text>{card.occupation}</Text>
                  </View>
                  <Text style={tw`text-3xl font-bold`}>{card.age}</Text>
                </View>
              </View>
            ) : (
              <View
                style={tw`relative bg-white h-3/4 rounded-xl justify-center items-center shadow-md`}
              >
                <Text style={tw`font-bold pb-5`}>No More Profiles</Text>
                <Image
                  style={tw`h-20 w-20`}
                  source={{
                    uri: "https://links.papareact.com/6gb",
                  }}
                />
              </View>
            )
          }
        />
      </View>

      <View style={tw`flex-row justify-evenly`}>
        <TouchableOpacity onPress={() => swipeRef.current.swipeBack()}>
          <Ionicons
            name="arrow-undo-circle-sharp"
            style={{ fontSize: 50, color: "orange" }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => swipeRef.current.swipeLeft()}>
          <Ionicons
            name="close-circle-sharp"
            style={{ fontSize: 50, color: "black" }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => swipeRef.current.swipeRight()}>
          <Ionicons
            name="heart-circle-sharp"
            style={{ fontSize: 50, color: "red" }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FCFF",
  },
  card: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white",
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent",
  },
});
