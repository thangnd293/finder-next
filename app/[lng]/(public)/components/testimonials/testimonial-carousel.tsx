"use client";

import ActionIcon from "@/components/action-icon";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import React from "react";
import Carousel from "react-multi-carousel";
import Testimonial from "./testimonial";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 870 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 870, min: 600 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
  },
};

export default function TestimonialCarousel() {
  return (
    <div className="my-own-custom-container">
      <Carousel
        className="mr-2 translate-x-2"
        itemClass="pr-4"
        responsive={responsive}
        ssr
        infinite
        autoPlay
        keyBoardControl
        arrows={false}
        renderButtonGroupOutside
        customButtonGroup={<ButtonGroup />}
      >
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <Testimonial key={i} />
          ))}
      </Carousel>
    </div>
  );
}

const ButtonGroup = ({ next, previous }: any) => {
  return (
    <div className="carousel-button-group mx-auto mt-3 w-fit space-x-4">
      <ActionIcon className="h-12 w-12" onClick={previous}>
        <ArrowLeftIcon />
      </ActionIcon>
      <ActionIcon className="h-12 w-12" onClick={next}>
        <ArrowRightIcon />
      </ActionIcon>
    </div>
  );
};
