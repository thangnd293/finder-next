import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { libreBaskerville } from "@/assets/fonts";
import { cn } from "@/lib/utils";
import React from "react";
import { Separator } from "@radix-ui/react-separator";

const Testimonial = () => {
  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle
          className={cn(
            libreBaskerville.className,
            "relative mb-1 text-xl md:text-3xl",
          )}
        >
          Hạnh
          <span className="absolute right-0 text-7xl text-gray-300 md:text-9xl">
            “
          </span>
        </CardTitle>
        <Separator className="t-1" />
      </CardHeader>
      <CardContent>
        <p className="min-h-[200px] text-justify text-sm font-light md:text-base">
          Sau vài tháng hẹn hò, mối quan hệ của chúng tôi đứng trước một ngã rẽ
          và chúng tôi quyết định dừng lại. Tôi đã yêu người ấy nhưng đã nghĩ là
          chuyện sẽ chẳng đi đến đâu. Vậy mà 9 tháng sau chúng tôi chẳng thể xa
          nhau thêm nữa.
        </p>
      </CardContent>
    </Card>
  );
};

export default Testimonial;
