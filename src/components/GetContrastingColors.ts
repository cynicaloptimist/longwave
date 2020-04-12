const ColorScheme: any = require("color-scheme");

export function GetContrastingColors(hue: number): [string, string] {
  const scheme = new ColorScheme();
  scheme.from_hue(hue).scheme("contrast").variation("soft");
  const [primary, , , , secondary]: string[] = scheme.colors();
  return ["#" + primary, "#" + secondary];
}
