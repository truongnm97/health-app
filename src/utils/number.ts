export const getRandomNumbers = (length: number, min = 1, max = 100) => {
  return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min)
}
