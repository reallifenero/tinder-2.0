import React, { createContext, useContext, useEffect, useState } from "react";
import { ResponseType } from "expo-auth-session";
import {
  GoogleAuthProvider,
  signInWithCredential,
  onAuthStateChanged,
  signOut,
} from "@firebase/auth";
import * as Google from "expo-auth-session/providers/google";
import { auth, db } from "../utils/firebase";

const AuthContext = createContext({});

const config = {
  iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  expoClientId: process.env.EXPO_PUBLIC_EXPO_CLIENT_ID,
  androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState(null);
  const [request, response, promptAsync] = Google.useAuthRequest(config);

  const signInWithGoogle = async () => {
    await promptAsync()
      .then((result) => {
        if (response?.type === "success") {
          const { id_token, access_token } = response.params;
          const credential = new GoogleAuthProvider.credential(
            id_token,
            access_token
          );

          signInWithCredential(auth, credential);
        }

        return Promise.reject();
      })
      .catch((error) => {
        setAuthError(error);
      })
      .finally(() => {});
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, [response, user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        signInWithGoogle,
        request,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
