export function convertPixelsToRem(pixels) {
  return pixels / parseFloat(getComputedStyle(document.documentElement).fontSize);
}