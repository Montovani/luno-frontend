export function capitalize(word) {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function capitalizeSentence(str) {
  if (!str) return "";
  return str
    .split(" ")
    .map(word => capitalize(word))
    .join(" ");
}

