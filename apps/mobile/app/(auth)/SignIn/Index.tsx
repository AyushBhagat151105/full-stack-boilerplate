import { useAuthActions, useAuthToken } from "@packages/backend";

import { useEffect, useState } from "react";
import { Button, Text, TextInput, View, Alert } from "react-native";
import { useRouter, useRootNavigationState, Redirect } from "expo-router";

export default function SignIn() {
    const { signIn } = useAuthActions();
    const token = useAuthToken();
    const router = useRouter();
    const navigationState = useRootNavigationState();

    const [step, setStep] = useState<"signIn" | "signUp">("signIn");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    useEffect(() => {
        if (!navigationState?.key) return;
        if (token) {
            router.replace("/panel");
        }
    }, [token, navigationState]);

    if (token) {
        return <Redirect href="/panel" />;
    }

    const handleAuth = async () => {
        setLoading(true);
        setError("");

        try {
            await signIn("password", { email, password, flow: step });

            Alert.alert(
                "Success",
                step === "signIn" ? "Signed in successfully!" : "Account created!"
            );

            router.push("/panel");
        } catch (err: any) {
            console.error("Auth error:", err);
            setError(err?.message || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (token === undefined || !navigationState?.key) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-gray-500 text-lg">Checking session...</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 justify-center bg-gray-100 px-6">
            <Text className="text-2xl font-bold text-center mb-6">
                {step === "signIn" ? "Welcome Back 👋" : "Create an Account 📝"}
            </Text>

            <TextInput
                className="border border-gray-300 rounded-lg p-3 mb-4 bg-white"
                placeholder="Email"
                onChangeText={setEmail}
                value={email}
                inputMode="email"
                autoCapitalize="none"
            />

            <TextInput
                className="border border-gray-300 rounded-lg p-3 mb-2 bg-white"
                placeholder="Password"
                onChangeText={setPassword}
                value={password}
                secureTextEntry
            />

            {error.length > 0 && (
                <Text className="text-red-600 text-center mb-3">{error}</Text>
            )}

            <View className="mb-4">
                <Button
                    title={loading ? "Please wait..." : step === "signIn" ? "Sign in" : "Sign up"}
                    onPress={handleAuth}
                    disabled={loading}
                />
            </View>

            <View className="items-center">
                <Text className="text-base mb-1 text-gray-600">
                    {step === "signIn"
                        ? "Don't have an account?"
                        : "Already have an account?"}
                </Text>
                <Button
                    title={step === "signIn" ? "Sign up instead" : "Sign in instead"}
                    onPress={() => setStep(step === "signIn" ? "signUp" : "signIn")}
                />
            </View>
        </View>
    );
}
