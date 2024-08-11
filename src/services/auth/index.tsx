import { spotifyAuthAPI } from "..";

export const getAccessToken = async (clientId: string, code: string) => {
  const verifier = localStorage.getItem("verifier");

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", `${process.env.NEXT_PUBLIC_REDIRECT_URI}/me`);
  params.append("code_verifier", verifier!);

  const result = await spotifyAuthAPI.post("/token", params, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  const { access_token } = result.data;
  return access_token;
};
