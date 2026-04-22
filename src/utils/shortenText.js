export const shortenText = (text, size) => {
  if (text?.length > size) {
    const shortText =
      text.slice(0, size).split(' ').slice(0, -1).join(' ') + '...';
    return { content: shortText, fullContent: text, isShortened: true };
  } else {
    return { content: text, fullContent: text, isShortened: false };
  }
};
