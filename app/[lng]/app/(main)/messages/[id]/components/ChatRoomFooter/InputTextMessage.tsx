import React from "react";
import { useFormContext } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";

const InputTextMessage = React.forwardRef<HTMLTextAreaElement>(
  ({}, forwardRef) => {
    const { register } = useFormContext();
    const { ref, ...others } = register("text");

    return (
      <TextareaAutosize
        className="flex w-full resize-none bg-transparent px-3 py-2.5 text-sm outline-none transition-colors placeholder:text-muted-foreground"
        ref={(e) => {
          if (typeof forwardRef === "function") forwardRef(e);
          else if (forwardRef) forwardRef.current = e;
          register("text").ref(e);
        }}
        placeholder="Message"
        minRows={1}
        maxRows={4}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            e.currentTarget.form?.requestSubmit();
          }
        }}
        {...others}
      />
    );
  },
);

InputTextMessage.displayName = "InputTextMessage";

export default InputTextMessage;
