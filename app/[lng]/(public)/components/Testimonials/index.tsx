import Heading from "../Heading";
import TestimonialCarousel from "./TestimonialCarousel";

const Testimonials = () => {
  return (
    <div className="w-full rounded-t-[60px] bg-secondary-background py-16 sm:rounded-t-[90px] sm:py-32 lg:rounded-t-[120px]">
      <div className="container">
        <Heading subtitle="Where" title="love" highlight="begins" />
        <TestimonialCarousel />
      </div>
    </div>
  );
};

export default Testimonials;
