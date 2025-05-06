import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';

export default function StartPage() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-lg text-gray-700 mb-4">Loading...</Text>
      <ActivityIndicator size="large" color="gray" />
    </View>
  );
}
