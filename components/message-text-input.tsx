"use client";

import Editor from "@draft-js-plugins/editor";
import { EmojiPlugin } from "@draft-js-plugins/emoji";
import { EditorState, convertFromRaw, getDefaultKeyBinding } from "draft-js";
import React, { useRef } from "react";

interface IMessageTextInputProps {
  emojiPlugin: EmojiPlugin;
}

export default function MessageTextInput({
  emojiPlugin,
}: IMessageTextInputProps) {
  const editor = useRef<Editor>(null);
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createWithContent(emptyContentState),
  );

  return (
    <Editor
      ref={editor}
      editorState={editorState}
      onChange={setEditorState}
      placeholder="Soạn tin nhắn..."
      plugins={[emojiPlugin]}
      keyBindingFn={myKeyBindingFn}
    />
  );
}

const emptyContentState = convertFromRaw({
  entityMap: {},
  blocks: [
    {
      key: "foo",
      text: "",
      type: "unstyled",
      entityRanges: [],
      depth: 0,
      inlineStyleRanges: [],
    },
  ],
});

function myKeyBindingFn(e: React.KeyboardEvent<{}>): string | null {
  if (e.code === "Enter" && !e.shiftKey) {
    return "submit";
  }

  return getDefaultKeyBinding(e);
}
