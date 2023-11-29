import Heading from "../Heading";
import TestimonialCarousel from "./TestimonialCarousel";

const Testimonials = () => {
  return (
    <div
      id="story"
      className="w-full rounded-t-[60px] bg-secondary-background py-16 sm:rounded-t-[90px] sm:py-32 lg:rounded-t-[120px]"
    >
      <div className="container">
        <Heading subtitle="Nơi" title="tình yêu" highlight="bắt đầu" />
        <TestimonialCarousel />
      </div>
    </div>
  );
};

export default Testimonials;
