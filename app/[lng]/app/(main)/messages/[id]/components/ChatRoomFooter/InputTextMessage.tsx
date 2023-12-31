import React from "react";
import { useFormContext } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";

const InputTextMessage = React.forwardRef<HTMLTextAreaElement>(
  ({}, forwardRef) => {
    const { register } = useFormContext();
    const { ref, ...others } = register("text");

    return (
      <TextareaAutosize
        className="flex w-full resize-none bg-transparent px-1.5 py-1 text-sm outline-none transition-colors placeholder:text-muted-foreground md:px-3 md:py-2.5"
        ref={(e) => {
          if (typeof forwardRef === "function") forwardRef(e);
          else if (forwardRef) forwardRef.current = e;
          register("text").ref(e);
        }}
        placeholder="Soan tin nhắn..."
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
