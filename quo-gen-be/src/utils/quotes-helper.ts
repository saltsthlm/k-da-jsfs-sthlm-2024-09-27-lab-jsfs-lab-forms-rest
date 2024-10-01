export const getMultipleRandomQuotes = <T>(
  quotesArr: T[],
  numberOfItems: number,
): T[] => {
  if (numberOfItems >= quotesArr.length) {
    throw new Error(
      "numberOfItems should be less than the length of the array",
    );
  }

  // Fisher-Yates shuffle algorithm to shuffle the array
  const shuffledArray: T[] = [...quotesArr];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray.slice(0, numberOfItems);
};

export const getRandomQuote = <T>(quotesArr: T[]) => {
  return quotesArr[Math.floor(Math.random() * (quotesArr.length - 1))];
};
