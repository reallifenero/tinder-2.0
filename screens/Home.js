import React, { useRef } from "react";
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
import Swiper from "react-native-deck-swiper";
import { useNavigation } from "@react-navigation/core";
import { Ionicons, AntDesign, Entypo } from "@expo/vector-icons";

import useAuth from "../hooks/useAuth";
import DUMMY_DATA from "../utils/data";

const Home = () => {
  const swipeRef = useRef(null);

  const { signOutWithGoogle, user } = useAuth();
  const navigation = useNavigation();

  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`flex-row items-center justify-between px-5`}>
        <TouchableOpacity>
          <Image
            source={{ uri: user.photoURL }}
            style={{ height: 30, width: 30, borderRadius: 100 }}
          />
        </TouchableOpacity>
        <TouchableOpacity>
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
          cards={DUMMY_DATA}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          horizontalSwipe
          infinite
          verticalSwipe={false}
          onSwipedLeft={() => {
            console.log("swiped");
          }}
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  textAlign: "right",
                  color: "red",
                },
              },
            },
            right: {
              title: "MATCH",
              style: {
                label: {
                  color: "#4DED30",
                },
              },
            },
          }}
          containerStyle={{ backgroundColor: "transparent" }}
          renderCard={(card, index) => (
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
          )}
        />
      </View>

      <View style={tw`flex-row justify-evenly`}>
        <TouchableOpacity>
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
