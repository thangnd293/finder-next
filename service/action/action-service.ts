import axiosInstance from "@/lib/axios";

export class ActionService {
  static prefix = "/action";

  static urls = {
    like: (id: string) => `${this.prefix}/like/${id}`,
    skip: (id: string) => `${this.prefix}/skip/${id}`,
    superLike: (id: string) => `${this.prefix}/super-like/${id}`,
    boost: `${this.prefix}/boosts`,
    unmatch: (id: string) => `${this.prefix}/un-matched/${id}`,
  };

  static like = async (id: string) => {
    const { data } = await axiosInstance.post(this.urls.like(id));

    return data;
  };

  static skip = async (id: string) => {
    const { data } = await axiosInstance.post(this.urls.skip(id));

    return data;
  };

  static superLike = async (id: string) => {
    const { data } = await axiosInstance.post(this.urls.superLike(id));

    return data;
  };

  static boost = async () => {
    const { data } = await axiosInstance.post(this.urls.boost);

    return data;
  };

  static unmatch = async (id: string) => {
    const { data } = await axiosInstance.post(this.urls.unmatch(id));

    return data;
  };
}
