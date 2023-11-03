import { customFetch } from "@/utils/http";
import "server-only";
import { OfferResponse } from "../offer";

export class ServerService {
  static urls = {
    linkSpotify: (spotifyToken: string) =>
      `/spotify/info?token=${spotifyToken}`,

    linkInstagram: (instagramToken: string) =>
      `/ins/info?token=${instagramToken}`,
    getOffers: `/offering?page=1&size=100`,
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

  static getOffers = async () => {
    return await customFetch(this.urls.getOffers).then(
      (res) => res.json() as Promise<OfferResponse>,
    );
  };
}
