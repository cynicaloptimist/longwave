const SpectrumCards: [string, string][] = [
  ["cold", "hot"],
  ["evil", "good"],
  ["peaceful", "warlike"],
];

export function RandomSpectrumCard() {
  return SpectrumCards[Math.floor(Math.random() * SpectrumCards.length)];
}
