import Button from "@/components/button";
import { buttonBaseVariants } from "@/components/ui/button-base";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "@radix-ui/react-icons";

export default function Navbar() {
  const buttons = ["Home", "About", "Feedback", "Services", "Contact"];

  return (
    <div className="group fixed bottom-14 left-1/2 z-50 -translate-x-1/2 rounded-2xl border border-gray-50 bg-background px-8 py-3 shadow-xl">
      {buttons.map((label, index) => (
        <Button
          key={index}
          className="font-light text-gray-500 !no-underline hover:text-primary"
          variant="link"
          size="sm"
        >
          {label}
        </Button>
      ))}

      <button
        className={cn(
          buttonBaseVariants({ variant: "default", size: "default" }),
          "min-w-12 ml-6 h-12 gap-0 px-4 transition-all duration-500 will-change-transform active:translate-y-px group-hover:gap-4 group-hover:duration-150",
        )}
      >
        <ArrowRightIcon />
        <span className="invisible max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-500 group-hover:visible group-hover:max-w-xs group-hover:opacity-100">
          Đăng ký
        </span>
      </button>
    </div>
  );
}
