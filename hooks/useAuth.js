import React, { createContext, useContext, useEffect } from "react";
import * as Google from "expo-auth-session/providers/google";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";

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

  useEffect(() => {
    if (response?.type === "success") {
      const idToken = response.credential;

      // console.log({ id: id_token, access: access_token });

      // const auth = getAuth();
      const provider = GoogleAuthProvider();
      const credential = provider.credential(idToken);

      signInWithCredential(auth, credential);
      // login ...
    }
  }, [response]);

  return (
    <AuthContext.Provider
      value={{
        user: null,
        promptAsync,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
