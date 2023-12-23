import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "@firebase/auth";
import { AsyncStorage } from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAWw0DMNWGqdkPbe1xzWeAwPQLExuS7N-s",
  authDomain: "tinder-419.firebaseapp.com",
  projectId: "tinder-419",
  storageBucket: "tinder-419.appspot.com",
  messagingSenderId: "910920738929",
  appId: "1:910920738929:web:bc5952d1f96f66b34513d0",
  measurementId: "G-XZV2DJSR4L",
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore();

export { auth, db };
