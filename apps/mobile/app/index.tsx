// app/panel/index.tsx
import { useAuthToken } from "@packages/backend";
import { Redirect } from "expo-router";
import { View, Text } from "react-native";

export default function Screen() {
  const token = useAuthToken();

  if (token === undefined) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-gray-500">Checking login status...</Text>
      </View>
    );
  }

  if (token === null) {
    return <Redirect href="/(auth)/SignIn/Index" />;
  }

  return (
    <View className="flex-1 justify-center items-center bg-gray-100">
      <Text className="text-2xl font-bold text-black mb-4">Welcome to the Panel 🎉</Text>
      <View>
        <Text className="text-blue-600">You’re logged in!</Text>
      </View>
    </View>
  );
}
