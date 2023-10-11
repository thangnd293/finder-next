import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => {
    const Wrapper = error ? "div" : React.Fragment;

    return (
      <Wrapper>
        <textarea
          className={cn(
            "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            {
              "border-red-500": error,
            },
            className,
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
      </Wrapper>
    );
  },
);
Textarea.displayName = "Textarea";

export default Textarea;
