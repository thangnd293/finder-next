import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

const GEO_LOC_URL =
  "https://raw.githubusercontent.com/pradt2/always-online-stun/master/geoip_cache.txt";
const IPV4_URL =
  "https://raw.githubusercontent.com/pradt2/always-online-stun/master/valid_ipv4s.txt";
const GEO_USER_URL = "https://geolocation-db.com/json";

// Hàm async để thực hiện các yêu cầu Axios
async function fetchData(url: string) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tải dữ liệu:", error);
    throw error;
  }
}

async function findClosestStunServer() {
  try {
    const [geoLocs, geoUser] = await Promise.all([
      fetchData(GEO_LOC_URL),
      fetchData(GEO_USER_URL),
    ]);

    const { latitude, longitude } = geoUser;
    const validIPv4s = (await fetchData(IPV4_URL)).trim().split("\n");

    const closestAddr = validIPv4s
      .map((addr: any) => {
        const [stunLat, stunLon] = geoLocs[addr.split(":")[0]];
        const dist = Math.sqrt(
          (latitude - stunLat) ** 2 + (longitude - stunLon) ** 2,
        );
        return [addr, dist];
      })
      .reduce(([addrA, distA]: any, [addrB, distB]: any) =>
        distA <= distB ? [addrA, distA] : [addrB, distB],
      )[0];

    return closestAddr;
  } catch (error) {
    console.error("Xảy ra lỗi khi tải dữ liệu hoặc xử lý dữ liệu.", error);
  }
}

type ResponseData = {
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const closestAddr = await findClosestStunServer();
  res.status(200).json({ message: closestAddr });
}
