export const shortenText = (text: string, size: number) => {
  if (text?.length > size) {
    const shortText = text.slice(0, size).split(' ').slice(0, -1).join(' ') + '...';
    return { content: shortText, fullContent: text, isShortened: true };
  } else {
    return { content: text, fullContent: text, isShortened: false };
  }
};

export type ShorterText = ReturnType<typeof shortenText>;
