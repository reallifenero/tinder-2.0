import React, { createContext, useContext, useEffect, useState } from "react";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../utils/firebase";

const AuthContext = createContext({});

const config = {
  iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  expoClientId: process.env.EXPO_PUBLIC_EXPO_CLIENT_ID,
  androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
};

export const AuthProvider = ({ children }) => {
  const [request, response, promptAsync] = Google.useAuthRequest(config);

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const signInWithGoogle = async () => {
    await promptAsync().then(() => {
      if (response?.type == "success") {
        // login...
      } else {
      }
    });
  };

  // useEffect(() => {
  //   var provider = new GoogleAuthProvider();

  //   signInWithPopup(auth, provider);
  // }, [response]);

  return (
    <AuthContext.Provider
      value={{
        user: null,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
