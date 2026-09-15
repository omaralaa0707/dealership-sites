export function hexToRgb(hex) {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function channelLuminance(channel) {
  const s = channel / 255;
  return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
}

export function relativeLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  return (
    0.2126 * channelLuminance(r) +
    0.7152 * channelLuminance(g) +
    0.0722 * channelLuminance(b)
  );
}

export function contrastRatio(hexA, hexB) {
  const lumA = relativeLuminance(hexA) + 0.05;
  const lumB = relativeLuminance(hexB) + 0.05;
  return lumA > lumB ? lumA / lumB : lumB / lumA;
}

export function meetsAA(hexA, hexB, isLargeText = false) {
  const ratio = contrastRatio(hexA, hexB);
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}

export function pickReadableText(backgroundHex) {
  const blackRatio = contrastRatio("#000000", backgroundHex);
  const whiteRatio = contrastRatio("#ffffff", backgroundHex);
  return blackRatio >= whiteRatio ? "#000000" : "#ffffff";
}
