import React from "react";
import Heading from "../Heading";
import Image from "next/image";
import Bubble from "./Bubble";

const HowItWork = () => {
  return (
    <div id="info" className="container pb-32">
      <Heading subtitle="Bạn" title="muốn" highlight="hẹn hò?" />

      <div className="grid grid-cols-1 gap-y-10 md:grid-cols-2">
        <div className="relative mx-auto aspect-[67/135] w-2/3">
          <Image
            className="justify-self-center"
            src="/images/mobile-screen.png"
            alt="Finder mobile screen"
            fill
          />
        </div>

        <div className="relative min-h-[500px] rounded-b-[90px] rounded-t-[90px] bg-gradient-to-b from-primary-50 to-primary-100 lg:bg-none">
          <Bubble
            className="absolute -right-4 md:right-0"
            title="Tương tác"
            description="Tương tác với gu của mình"
            imageUrl="/images/love-message.png"
          />
          <Bubble
            className="absolute -left-4 top-1/2 -translate-y-1/2 md:left-0"
            title="Nhắn tin"
            description="Tìm hiểu đối phương qua tin nhắn, hình ảnh, video call"
            imageUrl="/images/message.png"
          />
          <Bubble
            className="absolute -right-4 bottom-0 md:right-10"
            title="Hẹn hò"
            description="Hẹn hò với đối phương qua những hoạt động thú vị"
            imageUrl="/images/blind-date.png"
          />
        </div>
      </div>
    </div>
  );
};

export default HowItWork;
