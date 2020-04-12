export function GetScore(target: number, guess: number) {
  const difference = Math.abs(target - guess);
  if (difference > 2) {
    return 0;
  }
  return 4 - Math.floor(difference);
}
