const ScaleCards: [string, string][] = [
  ["cold","hot"],
  ["evil","good"],
  ["peaceful","warlike"]
]

export function RandomScaleCard() {
  return ScaleCards[Math.floor(Math.random() * ScaleCards.length)];
}