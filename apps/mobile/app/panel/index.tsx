import { useMutation, useQuery } from "convex/react";
import { api, useAuthToken } from "@packages/backend";
import { Redirect } from "expo-router";
import { View, Text, Image, Pressable, TextInput, ScrollView } from "react-native";
import { useState } from "react";



export default function Panel() {
  const token = useAuthToken();
  const identity = useQuery(api.auth.currentIdentity);
  const tasks = useQuery(api.tasks.get);
  const addTask = useMutation(api.tasks.post);
  const removeTask = useMutation(api.tasks.remove);
  const completeTask = useMutation(api.tasks.complete);
  const [title, setTitle] = useState("");

  const handleAdd = async () => {
    if (!title.trim()) return;
    await addTask({ title });
    setTitle("");
  };


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
    <ScrollView className="flex-1 bg-gray-100 px-4 py-6">
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
      <View className="mb-6">
        <TextInput
          className="border px-4 py-2 rounded-md bg-white"
          placeholder="Enter new task"
          value={title}
          onChangeText={setTitle}
        />
        <Pressable
          onPress={handleAdd}
          className="mt-2 bg-blue-600 p-2 rounded-md"
        >
          <Text className="text-white text-center font-semibold">Add Task</Text>
        </Pressable>
      </View>

      {tasks?.map((task) => (
        <View
          key={task._id}
          className={`bg-white p-3 rounded mb-2 flex-row justify-between items-center ${task.isCompleted ? "opacity-50" : ""
            }`}
        >
          <Text className={task.isCompleted ? "line-through" : ""}>
            {task.text}
          </Text>
          <View className="flex-row gap-2">
            {!task.isCompleted && (
              <Pressable
                onPress={() => completeTask({ id: task._id })}
                className="px-2"
              >
                <Text className="text-green-600">Done</Text>
              </Pressable>
            )}
            <Pressable
              onPress={() => removeTask({ id: task._id })}
              className="px-2"
            >
              <Text className="text-red-600">Delete</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}
