import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: [
    "http://127.0.0.1:3210",
    "http://localhost:3000",
    "http://192.168.31.93:3000",
  ],
};

export default nextConfig;
