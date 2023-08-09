export const getEmoji = (emoji: string) => {
  const _unicode = emoji.codePointAt(0)?.toString(16);
  const src = `https://cdn.jsdelivr.net/npm/emoji-datasource-facebook/img/facebook/64/${_unicode}.png`;

  return src;
};
