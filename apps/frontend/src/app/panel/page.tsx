"use client";
import { useQuery } from "convex/react";
import { api, useAuthToken } from "@packages/backend";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PanelPage() {
    const token = useAuthToken();
    const identity = useQuery(api.auth.currentIdentity);
    const router = useRouter();

    // Redirect if not authenticated
    useEffect(() => {
        if (token === null) {
            router.replace("/"); // change path if different
        }
    }, [token, router]);

    if (token === undefined || identity === undefined) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500 text-lg">Checking user details...</p>
            </div>
        );
    }

    if (identity === null) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-600 text-lg">Error loading user information.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 py-8">
            {identity.pictureUrl && (
                <img
                    src={identity.pictureUrl}
                    alt="Profile"
                    className="w-24 h-24 rounded-full mb-4"
                />
            )}
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
                {identity.name ?? "User"}
            </h1>
            {identity.email && (
                <p className="text-gray-700 text-base">{identity.email}</p>
            )}
        </div>
    );
}
