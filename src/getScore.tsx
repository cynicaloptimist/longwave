export function getScore(target: number, guess: number) {
  const difference = Math.abs(target - guess);
  if (difference > 20) {
    return 0;
  }
  return 4 - Math.floor(difference / 5);
}
