interface RGB {
  b: number;
  g: number;
  r: number;
}

function hex2Rgb(hex: string): RGB | undefined {
  if (!hex || hex === undefined || hex === '') {
      return undefined;
  }

  const result: RegExpExecArray | null =
        /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
  } : undefined;
}

function rgb2YIQ({ r, g, b }: RGB): number {
  return ((r * 299) + (g * 587) + (b * 114)) / 1000;
}

export function GetContrastingText(colorHex: string | undefined,
                       threshold: number = 128): string {
  if (colorHex === undefined) {
      return '#000';
  }

  const rgb: RGB | undefined = hex2Rgb(colorHex);

  if (rgb === undefined) {
      return '#000';
  }

  return rgb2YIQ(rgb) >= threshold ? '#000' : '#fff';
}