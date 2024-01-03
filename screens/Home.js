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
  setDoc,
  where,
} from "firebase/firestore";
import Swiper from "react-native-deck-swiper";
import { useNavigation } from "@react-navigation/core";
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";

import useAuth from "../hooks/useAuth";
import DATA from "../utils/data";
import { db } from "../utils/firebase";

const Home = () => {
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
      unsub = onSnapshot(collection(db, "users"), (snapshot) => {
        setProfiles(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
    };

    fetchCards();
    return unsub;
  });

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
          // infinite
          verticalSwipe={false}
          onSwipedLeft={() => {}}
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
                      {card.firstName} {card.lastName}
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
};

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
