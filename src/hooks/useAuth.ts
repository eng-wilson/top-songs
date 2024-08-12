"use client";

const useAuth = () => {
  async function redirectToAuthCodeFlow(clientId: string) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", `${process.env.NEXT_PUBLIC_REDIRECT_URI}/me`);
    params.append("scope", "user-top-read");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
  }

  function generateCodeVerifier(length = 128) {
    if (length < 43 || length > 128) {
      throw new Error("Length must be between 43 and 128 characters.");
    }

    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const verifier = Array.from(
      array,
      (byte) => possible[byte % possible.length]
    ).join("");

    return verifier;
  }

  async function generateCodeChallenge(codeVerifier: string) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest("SHA-256", data);
    const base64 = btoa(String.fromCharCode(...new Uint8Array(digest)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    return base64;
  }

  return {
    redirectToAuthCodeFlow,
  };
};

export default useAuth;
