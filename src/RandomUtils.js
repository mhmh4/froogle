// RandomUtils.js

export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomItem(items) {
  let n = items.length;
  let randomIndex = getRandomIntInclusive(0, n - 1);
  return items[randomIndex];
}
