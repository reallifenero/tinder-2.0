import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { doc, setDoc } from "@firebase/firestore";
import { db, timestamp } from "../utils/firebase";
import { useNavigation } from "@react-navigation/native";

import useAuth from "../hooks/useAuth";
const Modal = () => {
  const { user } = useAuth();
  const navigation = useNavigation();
  const [image, setImage] = useState("");
  const [age, setAge] = useState("");
  const [occupation, setOccupation] = useState("");

  const incompleteForm = !image || !age || !occupation;

  const updateUserProfile = () => {
    setDoc(doc(db, "users", user.uid), {
      id: user.uid,
      firstName: user.displayName,
      photoURL: image,
      occupation,
      age,
      timestamp,
    })
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((err) => {
        Alert.alert("Error", err.message);
      });
  };

  return (
    <View style={tw.style("flex-1 items-center pt-1")}>
      <Image
        style={tw.style("h-20 w-full")}
        resizeMode="contain"
        source={require("../assets/text-logo.png")}
      />
      <Text style={tw`text-xl text-gray-500 p-2 font-bold`}>
        Welcome {user.displayName}
      </Text>

      <Text style={tw`text-center p-4 font-bold text-red-400`}>
        Step 1: Your Profile Picture
      </Text>

      <TextInput
        placeholder="Enter a profile pic url"
        style={tw`text-center w-80 text-xl pb-2 border rounded-md`}
        keyboardType="url"
        value={image}
        onChangeText={setImage}
      />
      <Text style={tw`text-center p-4 font-bold text-red-400`}>
        Step 2: Your Occupation
      </Text>

      <TextInput
        placeholder="Enter your occupation"
        style={tw`text-center w-80 text-xl pb-2 border rounded-md`}
        onChangeText={setOccupation}
        value={occupation}
      />
      <Text style={tw.style("text-center p-4 font-bold text-red-400")}>
        Step 3: How old are you?
      </Text>

      <TextInput
        placeholder="Enter your age"
        style={tw.style("text-center w-80 text-xl pb-2  border rounded-md")}
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
        maxLength={2}
      />

      <TouchableOpacity
        disabled={incompleteForm}
        style={tw.style(
          "w-60 p-3 rounded-xl absolute bottom-10 bg-red-500",
          incompleteForm && "bg-gray-400"
        )}
        onPress={updateUserProfile}
      >
        <Text
          style={tw.style(
            "text-center font-bold capitalize text-white text-xl"
          )}
        >
          Update Profile
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Modal;
