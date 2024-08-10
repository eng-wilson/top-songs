"use client";

import { getAccessToken } from "@/services/auth";
import { fetchProfile, getUserTop } from "@/services/profile";
import { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

// import { Container } from './styles';

const Me = () => {
  const params = useSearchParams();
  const code = params.get("code") || "";
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID || "";

  const [user, setUser] = useState();
  const [topTracks, setTopTracks] = useState<any[]>([]);
  const [items, setItems] = useState<{
    s: any[];
    i: any[];
    m: any[];
    p: any[];
  }>({
    s: [],
    i: [],
    m: [],
    p: [],
  });

  const getUserInfo = async () => {
    try {
      if (code) {
        let accessToken = localStorage.getItem("@simpfy_access_token");

        if (!accessToken) {
          accessToken = await getAccessToken(clientId, code);
        }

        if (accessToken) {
          localStorage.setItem("@simpfy_access_token", accessToken);

          const profile = await fetchProfile();

          if (profile) {
            setUser(profile);
          }
        }
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  const getTopTracksData = async () => {
    try {
      let accessToken = localStorage.getItem("@simpfy_access_token");

      if (!accessToken) {
        accessToken = await getAccessToken(clientId, code);
      }
      if (accessToken) {
        localStorage.setItem("@simpfy_access_token", accessToken);
        const response = await getUserTop("artists", 0);
        const response2 = await getUserTop("artists", 50);

        if (response.data.items && response2.data.items) {
          setTopTracks([...response.data.items, ...response2.data.items]);

          setItems({
            s: [...response.data.items, ...response2.data.items].filter(
              (track: { name: string }) =>
                track.name.toLocaleLowerCase().startsWith("s")
            ),
            i: [...response.data.items, ...response2.data.items].filter(
              (track: { name: string }) =>
                track.name.toLocaleLowerCase().startsWith("i")
            ),
            m: [...response.data.items, ...response2.data.items].filter(
              (track: { name: string }) =>
                track.name.toLocaleLowerCase().startsWith("m")
            ),
            p: [...response.data.items, ...response2.data.items].filter(
              (track: { name: string }) =>
                track.name.toLocaleLowerCase().startsWith("p")
            ),
          });
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (code) {
      getUserInfo();

      getTopTracksData();
    }
  }, [code]);
  return (
    <div>
      <div>
        <span>S - </span>
        <span>{items?.s?.[0]?.name}</span>
      </div>

      <div>
        <span>I - </span>
        <span>{items?.i?.[0]?.name}</span>
      </div>

      <div>
        <span>M - </span>
        <span>{items?.m?.[0]?.name}</span>
      </div>

      <div>
        <span>P - </span>
        <span>{items?.p?.[0]?.name}</span>
      </div>
    </div>
  );
};

export default Me;
