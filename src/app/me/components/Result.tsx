"use client";

import { getAccessToken } from "@/services/auth";
import { fetchProfile, getUserTop } from "@/services/profile";
import { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
import Artist from "./Artist";
import Title from "./Title";

let skip = false;

const Result = () => {
  const params = useSearchParams();
  const code = params.get("code") || "";
  const clientId = process.env.NEXT_PUBLIC_CLIENT_ID || "";

  const [user, setUser] = useState<any>();
  const [fetching, setFetching] = useState(true);
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
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    if (code && !skip) {
      getUserInfo();

      getTopTracksData();

      return () => {
        skip = true;
      };
    }
  }, [code]);

  return (
    <main className="flex bg-[#17171f] flex-col h-[100dvh] w-full items-center justify-start pt-10 px-4 gap-6">
      <h1 className="text-white text-[30px] md:text-[42px] font-semibold text-center font-poppins">
        Yes, I&apos;m a <span className="font-black">SIMP</span>
      </h1>
      {!fetching && (
        <section className="flex flex-col h-fit justify-center px-2 md:px-6 py-4 gap-6 md:gap-10 max-w-[500px] rounded-md bg-white/5">
          <div className="flex items-center gap-2">
            <Title title="S" />
            <div className="flex items-center gap-2 flex-wrap">
              {items?.s.slice(0, 2).map((item) => (
                <Artist
                  key={item.name}
                  name={item.name}
                  image={item.images[0].url}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Title title="I" />
            <div className="flex items-center gap-2 flex-wrap">
              {items?.i.slice(0, 2).map((item) => (
                <Artist
                  key={item.name}
                  name={item.name}
                  image={item.images[0].url}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Title title="M" />
            <div className="flex items-center gap-2 flex-wrap">
              {items?.m.slice(0, 2).map((item) => (
                <Artist
                  key={item.name}
                  name={item.name}
                  image={item.images[0].url}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Title title="P" />
            <div className="flex items-center gap-2 flex-wrap">
              {items?.p.slice(0, 2).map((item) => (
                <Artist
                  key={item.name}
                  name={item.name}
                  image={item.images[0].url}
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {fetching && (
        <svg
          className="animate-spin m-auto "
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.14,1.16a11,11,0,0,0-9,8.92A1.59,1.59,0,0,0,2.46,12,1.52,1.52,0,0,0,4.11,10.7a8,8,0,0,1,6.66-6.61A1.42,1.42,0,0,0,12,2.69h0A1.57,1.57,0,0,0,10.14,1.16Z"
            className="spinner_P7sC"
            fill="#fff"
          />
        </svg>
      )}

      {!fetching && (
        <span className="text-xs text-center font-poppins">
          Made for <b>{user?.display_name}</b> with{" "}
          <a href="" className="font-bold">
            SIMPfy
          </a>
        </span>
      )}
    </main>
  );
};

export default Result;
