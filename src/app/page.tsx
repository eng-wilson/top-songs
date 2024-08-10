"use client";

import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";

export default function Home() {
  const { redirectToAuthCodeFlow } = useAuth();

  const handleRedirect = async () => {
    try {
      const clientId = process.env.NEXT_PUBLIC_CLIENT_ID || "";
      redirectToAuthCodeFlow(clientId);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    localStorage.removeItem("@simpfy_access_token");
  }, []);

  return (
    <main className="flex flex-col h-[100dvh] w-full items-center justify-center">
      <h1>SIMPfy</h1>
      <button onClick={handleRedirect}>Log in with Spotify</button>
    </main>
  );
}
