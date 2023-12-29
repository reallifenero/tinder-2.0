import React from "react";
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
  const { signOutWithGoogle, user } = useAuth();
  const navigation = useNavigation();
  // console.log(user.photoURL);
  return (
    <SafeAreaView style={tw`flex-1`}>
      {/* Header */}
      <View style={tw`items-center relative flex`}>
        <TouchableOpacity style={tw`absolute left-5`}>
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
          style={tw`absolute right-5`}
          onPress={() => navigation.navigate("Chat")}
        >
          <Ionicons name="chatbubbles-sharp" size={32} color="black" />
        </TouchableOpacity>
      </View>
      {/* Cards */}
      <View style={tw`flex-1 -mt-6`}>
        <Swiper
          cards={DUMMY_DATA}
          stackSize={5}
          cardIndex={0}
          animateCardOpacity
          verticalSwipe={false}
          onSwipedLeft={() => {
            console.log("swiped");
          }}
          containerStyle={{ backgroundColor: "transparent" }}
          renderCard={(card) => (
            <View key={card.id} style={tw`relative bg-white h-3/4 rounded-xl`}>
              <Image
                style={tw`absolute top-0 h-full w-full rounded-xl`}
                source={{ uri: card.photoURL }}
              />
              <View
                style={tw`absolute bottom-0 bg-white w-full h-20 
                flex-row items-center justify-between p-3 shadow-xl rounded-xl`}
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

      {/* Home View */}

      <View style={tw`p-5 justify-end items-center h-full`}>
        <Text>I am the Home Screen</Text>
        <Button
          title="Go to chat screen"
          onPress={() => navigation.navigate("Chat")}
        />
        <Button title="Logout" onPress={() => signOutWithGoogle()} />
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
