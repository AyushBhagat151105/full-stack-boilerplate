"use client"
import { useQuery } from "convex/react";
import Image from "next/image";

import { api } from "@packages/backend"


export default function Home() {
  const tasks = useQuery(api.tasks.get);
  return (
    <div>
      {tasks?.map((task) => (
        <div key={task._id}>
          {task.text}
        </div>
      ))}
    </div>
  );
}
