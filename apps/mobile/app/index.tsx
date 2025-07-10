import { useQuery } from "convex/react";
import { api } from "@packages/backend";
import { View, Text } from "react-native";
import { Card, CardContent, CardTitle } from "~/components/ui/card";

export default function Screen() {
  const tasks = useQuery(api.tasks.get);

  return (
    <View>
      {tasks?.map((task) => (
        <Text key={task._id} className="text-white">{task.text}</Text>
      ))}
    </View>
  );
}
