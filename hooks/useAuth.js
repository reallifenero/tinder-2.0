import React, { createContext, useContext } from "react";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";

const AuthContext = createContext({});

const config = {
  iosClientId:
    "910920738929-npjt6fgj5ll8j2jaoso1h3f73ign7g60.apps.googleusercontent.com",
  androidClientId:
    "910920738929-tegma7rmbkmi90j55p41f78ohsdcmrkc.apps.googleusercontent.com",
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
};

export const AuthProvider = ({ children }) => {
  const signInWithGoogle = async () => {
    await Google.logInAsync(config).then(async (logInResult) => {
      if (logInResult.type === "success") {
        // login...
      }
    });
  };

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
