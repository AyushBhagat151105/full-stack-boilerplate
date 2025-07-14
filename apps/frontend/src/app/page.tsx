"use client";
import { useAuthActions, useAuthToken } from "@packages/backend";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Home() {
  const { signIn } = useAuthActions();
  const token = useAuthToken();
  const router = useRouter();

  const [step, setStep] = useState<"signIn" | "signUp">("signIn");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      router.push("/panel");
    }
  }, [token]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      await signIn("password", {
        email,
        password,
        flow: step,
      });
      // `useEffect` will handle the redirection based on token
    } catch (err: any) {
      setError(err?.message || "Authentication failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md space-y-6"
      >
        <h2 className="text-3xl font-semibold text-gray-800 text-center">
          {step === "signIn" ? "Welcome Back 👋" : "Join Us Today 🚀"}
        </h2>

        <input
          name="email"
          placeholder="Email"
          type="email"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
        />

        <input
          name="password"
          placeholder="Password"
          type="password"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 placeholder-gray-500"
        />

        {error && (
          <p className="text-red-600 text-sm text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50"
        >
          {loading ? "Please wait..." : step === "signIn" ? "Sign in" : "Sign up"}
        </button>

        <button
          type="button"
          onClick={() => setStep(step === "signIn" ? "signUp" : "signIn")}
          className="w-full text-blue-600 hover:text-blue-800 transition text-sm text-center"
        >
          {step === "signIn"
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </button>
      </form>
    </div>
  );
}
