import { customFetch } from "@/utils/http";
import "server-only";

export class ServerService {
  static urls = {
    linkSpotify: (spotifyToken: string) =>
      `/spotify/info?token=${spotifyToken}`,

    linkInstagram: (instagramToken: string) =>
      `/ins/info?token=${instagramToken}`,
  };

  static linkSpotify = async (spotifyToken: string, accessToken: string) => {
    return await customFetch(
      this.urls.linkSpotify(spotifyToken),
      undefined,
      accessToken,
    ).then((res) => res.json());
  };

  static linkInstagram = async (
    instagramToken: string,
    accessToken: string,
  ) => {
    return await customFetch(
      this.urls.linkInstagram(instagramToken),
      undefined,
      accessToken,
    ).then((res) => res.json());
  };
}
