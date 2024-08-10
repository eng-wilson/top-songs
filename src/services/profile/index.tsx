import { spotifyAPI } from "..";

export const fetchProfile = async (): Promise<any> => {
  const result = await spotifyAPI.get("/me");

  return result.data;
};

export const getUserTop = (type: "artists" | "tracks") => {
  return spotifyAPI.get(`/me/top/${type}`, {
    params: {
      limit: 20,
      offset: 20,
    },
  });
};
