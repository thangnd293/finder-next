import { Card, CardContent, CardHeader, CardTitle } from "@/components/Card";
import { libreBaskerville } from "@/assets/fonts";
import { cn } from "@/lib/utils";
import React from "react";
import { Separator } from "@radix-ui/react-separator";

interface TestimonialProps {
  user: string;
  description: string;
}
const Testimonial = ({ user, description }: TestimonialProps) => {
  return (
    <Card className="bg-background">
      <CardHeader>
        <CardTitle
          className={cn(
            libreBaskerville.className,
            "relative mb-1 text-xl md:text-3xl",
          )}
        >
          {user}
          <span className="absolute right-0 text-7xl text-gray-300 md:text-9xl">
            “
          </span>
        </CardTitle>
        <Separator className="t-1" />
      </CardHeader>
      <CardContent>
        <p className="min-h-[200px] text-justify text-sm font-light md:text-base">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

export default Testimonial;
