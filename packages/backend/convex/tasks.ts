import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("tasks").collect();
  },
});

export const post = mutation({
  args: {
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const task = { text: args.title, isCompleted: false };
    if (!task) throw new Error("Task not found");
    const data = await ctx.db.insert("tasks", task);
    return data;
  },
});

export const remove = mutation({
  args: {
    id: v.id("tasks"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.delete(args.id);
  },
});

export const complete = mutation({
  args: {
    id: v.id("tasks"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.patch(args.id, { isCompleted: true });
  },
});
