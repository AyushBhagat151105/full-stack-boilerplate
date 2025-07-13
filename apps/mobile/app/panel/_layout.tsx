import { Stack } from 'expo-router';
import { useAuthToken } from '@packages/backend';
import { useRouter, useRootNavigationState } from 'expo-router';
import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { ThemeToggle } from '~/components/ThemeToggle';

export default function ProtectedLayout() {
    const token = useAuthToken();
    const router = useRouter();
    const navState = useRootNavigationState();

    useEffect(() => {
        if (!navState?.key) return;
        if (token === null) {
            router.replace('/(auth)/SignIn/Index');
        }
    }, [token, navState]);

    if (token === undefined || !navState?.key) {
        return (
            <View className="flex-1 justify-center items-center">
                <Text className="text-gray-500">Checking session...</Text>
            </View>
        );
    }

    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    headerShown: true,  // show only this header
                    title: 'Panel',

                    headerRight: () => <ThemeToggle />,
                }}
            />
        </Stack>
    );
}
