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
    localStorage.removeItem("verifier");
  }, []);

  return (
    <main className="flex bg-[#17171f] flex-col h-[100dvh] w-full items-center justify-between py-10">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-white text-[32px] font-bold text-center font-poppins">
          SIMPfy
        </h1>
        <span className="text-white text-center text-md font-poppins">
          The artists that you <span className="font-bold">SIMP</span> the most
        </span>
      </div>

      <button
        onClick={handleRedirect}
        className="h-12 bg-[#1BB954] flex items-center justify-center rounded-md py-2 px-4 w-[200px]"
      >
        <span className="text-white font-bold font-poppins">
          Log in with Spotify
        </span>
      </button>

      <div>
        <span className="text-white text-xs font-poppins">
          Made by{" "}
          <a
            href="https://www.wilsoncarvalho.com/"
            target="_blank"
            className="font-bold"
          >
            Wilson Carvalho
          </a>
        </span>
      </div>
    </main>
  );
}
