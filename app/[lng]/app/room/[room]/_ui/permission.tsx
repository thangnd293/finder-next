import { IoMic, IoVideocam } from "react-icons/io5";
import usePermission from "react-use/lib/usePermission";

export default function Permission() {
  const isVideoPermission = usePermission({ name: "camera" });
  const isAudioPermission = usePermission({ name: "microphone" });

  let devices = [];
  isVideoPermission === "denied" && devices.push("video");
  isAudioPermission === "denied" && devices.push("audio");
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-gray-950 px-10 text-center">
      <p className="flex gap-4">
        {isVideoPermission === "denied" && <IoVideocam size={40} />}
        {isAudioPermission === "denied" && <IoMic size={40} />}
      </p>
      <p className="text-3xl font-semibold">
        Bạn chưa cho phép Finder truy cập vào {devices.join(" và ")}.
      </p>
      <p className="text-sm font-medium">
        Cho phép Finder sử dụng {devices.join(" và ")} để những người tham gia
        cuộc gọi
        <br className="hidden lg:block" /> có thể trò chuyện với bạn. Bạn có thể
        tắt quyền này sau{" "}
      </p>
    </div>
  );
}
