"use client";

import useAuth from "@/hooks/useAuth";
import { getAccessToken } from "@/services/auth";
import { fetchProfile } from "@/services/profile";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const params = useSearchParams();
  const code = params.get("code") || "";

  const { redirectToAuthCodeFlow } = useAuth();

  const handleRedirect = async () => {
    try {
      const clientId = process.env.NEXT_PUBLIC_CLIENT_ID || "";

      if (!code) {
        redirectToAuthCodeFlow(clientId);
      } else {
        let accessToken = localStorage.getItem("@simpfy_access_token");

        if (!accessToken) {
          accessToken = await getAccessToken(clientId, code);
        }

        if (accessToken) {
          localStorage.setItem("@simpfy_access_token", accessToken);
          const profile = await fetchProfile();
          console.log(profile);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleRedirect();
  }, [code]);

  return <main></main>;
}
