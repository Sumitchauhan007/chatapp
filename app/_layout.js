import { Slot, useSegments, useRouter } from "expo-router";
import React, { useEffect } from "react";
import { AuthContextProvider, useAuth } from "../context/authContext";
import { View, ActivityIndicator } from "react-native";

function MainLayout() {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (typeof isAuthenticated === "undefined") return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      // User is not authenticated and trying to access protected routes
      router.replace("/auth/signin");
    } else if (isAuthenticated && inAuthGroup) {
      // User is authenticated but on auth route — redirect to app home
      router.replace("/(app)/home");
    }
  }, [isAuthenticated]);

  return <Slot />;
}

function LayoutWrapper() {
  const { isAuthenticated } = useAuth();

  if (typeof isAuthenticated === "undefined") {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="gray" />
      </View>
    );
  }

  return <MainLayout />;
}

export default function RootLayout() {
  return (
    <AuthContextProvider>
      <LayoutWrapper />
    </AuthContextProvider>
  );
}

