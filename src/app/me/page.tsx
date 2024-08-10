"use client";

import { getAccessToken } from "@/services/auth";
import { fetchProfile } from "@/services/profile";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

// import { Container } from './styles';

const Me = () => {
  const params = useSearchParams();
  const code = params.get("code") || "";

  const getUserInfo = async () => {
    try {
      const clientId = process.env.NEXT_PUBLIC_CLIENT_ID || "";

      if (code) {
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
    getUserInfo();
  }, [code]);
  return <div></div>;
};

export default Me;
