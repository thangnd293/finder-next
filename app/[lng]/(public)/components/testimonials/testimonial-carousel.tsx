"use client";

import ActionIcon from "@/components/action-icon";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import React from "react";

import Slider from "react-slick";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Testimonial from "./testimonial";

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

export default function TestimonialCarousel() {
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
          {Array(10)
            .fill(0)
            .map((_, i) => (
              <Testimonial key={i} />
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
}
