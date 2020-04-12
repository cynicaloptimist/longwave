export function RandomFourCharacterString() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let randomString = "";
  for (let i = 0; i < 4; i++) {
    randomString += characters[Math.floor(Math.random() * characters.length)];
  }
  return randomString;
}
