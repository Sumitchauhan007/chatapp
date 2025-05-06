import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// Your Firebase configuration
const firebaseConfig = { apiKey: "AIzaSyB4nChE8xbrkHQAHKnce3LtNiroDCfAwAk", authDomain: "chat-6f04f.firebaseapp.com", projectId: "chat-6f04f", storageBucket: "chat-6f04f.firebasestorage.app", messagingSenderId: "739942631662", appId: "1:739942631662:web:c2db4e66ccefe7a2f90bff", measurementId: "G-X9N4T35XSW" 
};

const app = initializeApp(firebaseConfig);

const auth =
  Platform.OS === "web"
    ? getAuth(app)
    : initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
      });

// Initialize Firestore
const db = getFirestore(app);

// Export collections
const userRef = collection(db, "users");
const roomRef = collection(db, "rooms");

export { db, userRef, roomRef, auth };