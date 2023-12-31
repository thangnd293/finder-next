import * as React from "react";

import { cn } from "@/lib/utils";
import { useId } from "react";
import Label from "./Label";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
  label?: string;
  isRequired?: boolean;
  labelClassName?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, label, error, id, isRequired, labelClassName, ...props },
    ref,
  ) => {
    const Wrapper = error || label ? "div" : React.Fragment;
    const _id = "textarea" + useId();
    const elID = id ?? _id;

    return (
      <Wrapper>
        {label && (
          <Label className={labelClassName} htmlFor={elID}>
            {label} {isRequired && <span className="text-red-500">*</span>}
          </Label>
        )}
        <textarea
          id={elID}
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
