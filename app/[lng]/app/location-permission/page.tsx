import LocationIcon from "@/assets/icons/location-icon";
import RequestPermission from "./RequestPermission";

export default function LocationPermissionPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 px-4">
      <LocationIcon width={160} />

      <h3 className="text-center text-xl font-bold md:text-2xl">
        Chúng tôi cần vị trí của bạn để hiển thị những người ở gần
      </h3>
      <p className="max-w-3xl text-center text-sm text-secondary-foreground">
        Bạn cần cấn cho Finder quyền truy cập vị trí của bạn để chúng tôi có thể
        cho bạn thấy những người tuyệt vời quanh khu vực của bạn.
      </p>

      <RequestPermission />
    </div>
  );
}
