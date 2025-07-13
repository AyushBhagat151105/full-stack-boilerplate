import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";
import { query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Password],
});

export const currentIdentity = query(async (ctx) => {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) return null;

  console.log("identity.subject:", identity.subject);

  const parts = identity.subject.split("|");
  if (parts.length !== 2) {
    console.error("❌ Unexpected identity.subject format:", identity.subject);
    return null;
  }
  const userId = parts[0] as Id<"users">;
  const authAccountId = parts[1] as Id<"authAccounts">;

  const authAccount = await ctx.db.get(authAccountId);
  if (!authAccount) {
    console.error("❌ authAccount not found:", authAccountId);
    return null;
  }
  if (authAccount.userId !== userId) {
    console.error(
      "❌ authAccount.userId mismatch:",
      authAccount.userId,
      "vs",
      userId
    );
    return null;
  }

  const user = await ctx.db.get(userId);
  if (!user) {
    console.error("❌ user not found for ID:", userId);
    return null;
  }

  return {
    uid: userId,
    name: user.name ?? identity.name,
    email: user.email ?? identity.email,
    pictureUrl: user.image ?? identity.pictureUrl,
  };
});
