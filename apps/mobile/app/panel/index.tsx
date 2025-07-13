import { useQuery } from "convex/react";
import { api, useAuthToken } from "@packages/backend";
import { Redirect } from "expo-router";
import { View, Text, Image } from "react-native";


export default function Panel() {
  const token = useAuthToken();
  const identity = useQuery(api.auth.currentIdentity);
  console.log(identity);


  if (token === undefined) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500">Checking login status...</Text>
      </View>
    );
  }

  if (!token) {
    return <Redirect href="/(auth)/SignIn/Index" />;
  }

  if (identity === undefined) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-gray-500">Loading user details...</Text>
      </View>
    );
  }

  if (identity === null) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-red-600">Error loading user information.</Text>
      </View>
    );
  }

  return (



    <View className="flex-1 justify-center items-center bg-gray-100 p-4">
      {identity.pictureUrl && (
        <Image
          source={{ uri: identity.pictureUrl }}
          className="w-24 h-24 rounded-full mb-4"
        />
      )}
      <Text className="text-2xl font-bold mb-1">
        {identity.name ?? "User"}
      </Text>
      {identity.email && (
        <Text className="text-base text-gray-700">{identity.email}</Text>
      )}
    </View>


  );
}
