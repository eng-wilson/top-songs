import axios from "axios";

export const spotifyAPI = axios.create({
  baseURL: "https://api.spotify.com/v1",
});

export const spotifyAuthAPI = axios.create({
  baseURL: "https://accounts.spotify.com/api",
});

spotifyAPI.interceptors.request.use((config) => {
  try {
    const accessToken = localStorage.getItem("@simpfy_access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;

      return config;
    }

    return config;
  } catch (e) {
    return Promise.reject(e);
  }
});
