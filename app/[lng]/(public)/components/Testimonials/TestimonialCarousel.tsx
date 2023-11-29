"use client";

import ActionIcon from "@/components/ActionIcon";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import React from "react";

import Slider from "react-slick";
import Testimonial from "./Testimonial";

const TestimonialCarousel = () => {
  const sliderRef = React.useRef<Slider>(null);

  const nextSlide = () => {
    sliderRef.current?.slickNext();
  };

  const previousSlide = () => {
    sliderRef.current?.slickPrev();
  };

  return (
    <div className="my-own-custom-container">
      <div>
        <Slider className="[&_.slick-slide]:px-2" ref={sliderRef} {...settings}>
          {testimonials.map((testimonial, i) => (
            <Testimonial key={i} {...testimonial} />
          ))}
        </Slider>
      </div>

      <div className="carousel-button-group mx-auto mt-4 w-fit space-x-4">
        <ActionIcon className="h-12 w-12" onClick={previousSlide}>
          <ArrowLeftIcon />
        </ActionIcon>
        <ActionIcon className="h-12 w-12" onClick={nextSlide}>
          <ArrowRightIcon />
        </ActionIcon>
      </div>
    </div>
  );
};

export default TestimonialCarousel;

const settings = {
  arrows: false,
  dots: false,
  swipeToSlide: true,
  infinite: true,
  slidesToShow: 3,
  autoplay: true,
  centerMode: true,
  pauseOnHover: true,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 870,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 500,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const testimonials = [
  {
    user: "Hạnh",
    description:
      "Sau vài tháng hẹn hò, mối quan hệ của chúng tôi đứng trước một ngã rẽ và chúng tôi quyết định dừng lại. Tôi đã yêu người ấy nhưng đã nghĩ là chuyện sẽ chẳng đi đến đâu. Vậy mà 9 tháng sau chúng tôi chẳng thể xa nhau thêm nữa.",
  },
  {
    user: "Giang",
    description:
      'Tôi gặp vợ chưa cưới của mình trên Finder trong thời gian cách ly vì COVID. Cô ấy đến từ Lafayette, Indiana còn tôi từ Cleveland, Ohio. Chúng tôi đều theo Cơ đốc giáo và vướng "lưới tình" mà không tài nào gỡ được.',
  },
  {
    user: "Nhi",
    description:
      "Cả tôi và bạn cùng phòng thời đại học thường Finder cả đêm, không chờ gì nghiêm túc cả, cũng chẳng bắt kèo gì, chỉ dùng để giải trí. Và ông xã hiện giờ của tôi và tôi đã tương hợp trên Finder.",
  },

  {
    user: "Liên",
    description:
      "Gửi tất cả những ai đang độc thân, đặc biệt là những người hướng nội như chúng tôi: đừng ngại vượt ra ngoài vùng an toàn của các bạn. Đó là nơi bạn sẽ tạo được một mối liên kết chân thành. Finder đã đưa chúng tôi đến với nhau và tôi mãi mãi biết ơn vì điều đó. ❤",
  },
];
