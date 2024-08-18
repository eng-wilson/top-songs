"use client";

import { useLocale } from "@/contexts/LocaleContext";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";

export default function Home() {
  const { activeLocale, handleActiveLocale, languageOptions } = useLocale();
  const { t } = useTranslation("translation", { lng: activeLocale.value });
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
    <main className="flex bg-[#fafafa] flex-col h-[100dvh] w-full items-center justify-between py-10">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-[#17171f] text-[32px] font-bold text-center font-poppins">
          SIMPfy
        </h1>
        <span className="text-[#17171f] text-center text-md font-poppins">
          {t("description.part1")}{" "}
          <span className="font-bold">{t("description.part2")}</span>{" "}
          {t("description.part3")}
        </span>
      </div>

      <button
        onClick={handleRedirect}
        className="h-12 bg-[#1BB954] flex items-center justify-center rounded-md py-2 px-4 w-[200px]"
      >
        <span className="text-[#fff] font-bold font-poppins">
          {t("spotifyLogin")}
        </span>
      </button>

      <div className="flex flex-col gap-4">
        <span className="text-[#17171f] text-xs font-poppins">
          {t("madeBy")}{" "}
          <a
            href="https://www.wilsoncarvalho.com/"
            target="_blank"
            className="font-bold"
          >
            Wilson Carvalho
          </a>
        </span>

        <Select
          defaultValue={activeLocale}
          onChange={(e) => {
            if (e) {
              handleActiveLocale(e);
            }
          }}
          isSearchable={false}
          name="Language"
          menuPlacement="top"
          options={languageOptions}
          styles={{
            option: () => {
              return {
                color: "black",
                cursor: "pointer",
                fontFamily: "var(--poppins-font)",
                paddingLeft: 4,
              };
            },
            control: (style) => {
              return {
                ...style,
                fontFamily: "var(--poppins-font)",
              };
            },
          }}
        />
      </div>
    </main>
  );
}
