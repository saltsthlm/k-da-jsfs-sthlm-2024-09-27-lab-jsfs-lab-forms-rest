import { FetchMode, Quote } from "./types-and-enums";

export const getRandomQuoteFromApi = async (
  mode: FetchMode,
): Promise<{ quote?: Quote; quotes?: Quote[] }> => {
  let url = "http://localhost:3000/api/v1/quotes/random";
  if (mode) {
    url += "?results=" + 4;
  }
  /**
   * hint: if you get a 401 (access denied, it is because you're not sending the cookie to the server)
   * look at other APIs call on what you do to make it work for cookies
   */
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
    credentials: 'include'
  });
  
  const {
    quotes,
    quote,
    message,
  }: { quote?: Quote; quotes: Quote[]; message?: string } =
    await response.json();
  return new Promise((resolve, reject) => {
    if (!quotes && !quote) {
      return reject(new Error(message));
    }
    setTimeout(() => {
      resolve({ quotes, quote });
    }, 500);
  });
};

export const renderQuote = (
  quotesContainer: HTMLElement,
  data: { quote?: Quote; quotes?: Quote[] },
) => {
  const quoteTemplate = document.getElementById(
    "quote-template",
  ) as HTMLTemplateElement;
  if (data.quotes?.length) {
    data.quotes.forEach((quote) => {
      const quoteClone = document.importNode(quoteTemplate.content, true);
      const quoteEl = quoteClone.querySelector(".quote") as HTMLDivElement;
      const quoteTextEl = quoteEl.querySelector(
        ".quote-text",
      ) as HTMLHeadingElement;
      const quoteAuthorEl = quoteEl.querySelector(
        ".quote-author",
      ) as HTMLHeadingElement;
      quoteTextEl.textContent = quote.text;
      quoteAuthorEl.textContent = quote.user.name;
      quotesContainer.appendChild(quoteEl);
    });
  } else if (data.quote) {
    const quoteClone = document.importNode(quoteTemplate.content, true);
    const quoteEl = quoteClone.querySelector(".quote") as HTMLDivElement;
    const quoteTextEl = quoteEl.querySelector(
      ".quote-text",
    ) as HTMLHeadingElement;
    const quoteAuthorEl = quoteEl.querySelector(
      ".quote-author",
    ) as HTMLHeadingElement;
    quoteTextEl.textContent = data.quote.text;
    quoteAuthorEl.textContent = data.quote.user.name;
    quotesContainer.appendChild(quoteEl);
  }
};
