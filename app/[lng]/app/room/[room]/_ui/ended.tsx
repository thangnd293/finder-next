import { useReceiver } from "@/service/conversation";
import NextImage from "next/image";
import { IoCall, IoClose } from "react-icons/io5";

export default function Ended({ room }: { room: string }) {
  const { receiver } = useReceiver(room);
  const {
    images: [image],
  } = receiver || { images: [] };
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-gray-950 px-10 text-center">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        <div className="grid gap-4">
          <div className="grid items-center justify-items-center gap-5">
            <div className="relative h-20 w-20 overflow-hidden rounded-full border-2 border-solid border-primary-500">
              <NextImage
                src={image.url}
                alt="avatar"
                blurDataURL={image.blur}
                className=" h-full w-full object-cover"
                fill
                unoptimized
              />
            </div>
            <p className="text-md font-medium">Cuộc gọi đã kết thúc</p>
          </div>
          <div className="flex w-full justify-evenly">
            <button
              onClick={() => {
                //reload
                window.location.reload();
              }}
              className="flex flex-col items-center gap-2"
            >
              <p className="rounded-full bg-green-600 p-3">
                <IoCall size={24} />
              </p>
              <span className="text-[13px] font-medium">Gọi lại</span>
            </button>
            <button
              onClick={() => {
                window.close();
              }}
              className="flex flex-col items-center gap-2"
            >
              <p className="rounded-full bg-gray-600 p-3">
                <IoClose size={24} />
              </p>
              <span className="text-[13px] font-medium">Đóng</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
