"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@packages/backend";
import { cn } from "@/lib/utils";


export default function Tasks() {
    const tasks = useQuery(api.tasks.get);
    const addTask = useMutation(api.tasks.post);
    const removeTask = useMutation(api.tasks.remove);
    const completeTask = useMutation(api.tasks.complete);

    const [title, setTitle] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!title.trim()) return;
        await addTask({ title });
        setTitle("");
    };

    return (
        <div className="w-full max-w-md mx-auto mt-10 space-y-6">
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="text"
                    className="flex-1 px-4 py-2 border rounded-md"
                    placeholder="Add a new task"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                    Add
                </button>
            </form>

            <ul className="space-y-2">
                {tasks?.map((task) => (
                    <li
                        key={task._id}
                        className={cn(
                            "flex justify-between items-center px-4 py-2 bg-white rounded shadow",
                            task.isCompleted && "opacity-50 line-through"
                        )}
                    >
                        <span>{task.text}</span>
                        <div className="flex gap-2">
                            {!task.isCompleted && (
                                <button
                                    onClick={() => completeTask({ id: task._id })}
                                    className="text-green-600 hover:underline"
                                >
                                    Done
                                </button>
                            )}
                            <button
                                onClick={() => removeTask({ id: task._id })}
                                className="text-red-600 hover:underline"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
