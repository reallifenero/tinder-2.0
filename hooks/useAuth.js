import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  GoogleAuthProvider,
  signInWithCredential,
  onAuthStateChanged,
  signOut,
} from "@firebase/auth";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { auth, db } from "../utils/firebase";

WebBrowser.maybeCompleteAuthSession();
const AuthContext = createContext({});

const config = {
  iosClientId:
    "910920738929-npjt6fgj5ll8j2jaoso1h3f73ign7g60.apps.googleusercontent.com",
  // process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  expoClientId: process.env.EXPO_PUBLIC_EXPO_CLIENT_ID,
  androidClientId: process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID,
};

console.log(config);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [request, response, promptAsync] = Google.useAuthRequest(config);

  const signInWithGoogle = async () => {
    setLoading(true);

    await promptAsync()
      .then((result) => {
        return Promise.reject();
      })
      .catch((error) => {
        setAuthError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token, access_token } = response.params;
      const credential = new GoogleAuthProvider.credential(
        id_token,
        access_token
      );

      signInWithCredential(auth, credential);
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }

      setLoadingInitial(false);
    });
  }, [response, user]);

  const signOutWithGoogle = () => {
    setLoading(true);

    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        setAuthError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      request,
      authError,
      signInWithGoogle,
      signOutWithGoogle,
    }),
    [user, loading, request, authError, signInWithGoogle, signOutWithGoogle]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
