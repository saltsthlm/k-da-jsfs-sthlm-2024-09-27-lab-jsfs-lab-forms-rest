import "./style.css";
import { FetchMode } from "./types-and-enums";
import { getRandomQuoteFromApi, renderQuote } from "./quotes.module";
import { logout } from "./auth.module";

let currentFetchMode = FetchMode.Single;
const singleFetchModeBtn = document.querySelector("#singleFetchMode");
const multipleFetchModeBtn = document.querySelector("#multipleFetchMode");
const logoutButton = document.querySelector("#logoutButton");

export const showLoader = (loaderEl: HTMLElement | null) => {
  loaderEl?.removeAttribute("hidden");
};

export const hideLoader = (loaderEl: HTMLElement | null) => {
  loaderEl?.setAttribute("hidden", "true");
};

export const changeFetchMode = (mode: FetchMode) => {
  currentFetchMode = mode;
  if (currentFetchMode === FetchMode.Single) {
    singleFetchModeBtn?.classList.add("active");
    multipleFetchModeBtn?.classList.remove("active");
  } else {
    multipleFetchModeBtn?.classList.add("active");
    singleFetchModeBtn?.classList.remove("active");
  }
};

const showErrorToast = (message: string) => {
  const toastTemplate = document.getElementById(
    "toast-template",
  ) as HTMLTemplateElement;
  if (!toastTemplate) return;
  const toastClone = document.importNode(toastTemplate.content, true);
  document.body.appendChild(toastClone);
  const newToast = document.body.lastElementChild;
  if (!newToast) return;
  newToast.textContent = message;
  setTimeout(() => {
    newToast.classList.add("fade-in");
  }, 10);
  setTimeout(() => {
    newToast.remove();
  }, 3000);
};

export const getRandomQuote = async () => {
  const loader = document.getElementById("loader");
  const quoteEl = document.querySelector("#quotesContainer") as HTMLDivElement;
  try {
    showLoader(loader);
    const response = await getRandomQuoteFromApi(currentFetchMode);
    quoteEl.innerHTML = "";
    await renderQuote(quoteEl, response);
    hideLoader(loader);
  } catch (error) {
    console.error("Failed to fetch random quote:", error);
    if ((error as Error).message.includes("Access denied")) {
      showErrorToast(
        "Failed to fetch random quote. " +
          (error as Error).message +
          "Redirecting to login...",
      );
      setTimeout(() => {
        location.href = `${location.origin}/login/`;
      }, 3000);
    } else {
      showErrorToast(
        "Failed to fetch random quote. " + (error as Error).message,
      );
    }
    hideLoader(loader);
  }
};

const addListeners = () => {
  const refetchQuoteBtn = document.querySelector("#refetchQuoteBtn");
  refetchQuoteBtn?.addEventListener("click", () => {
    getRandomQuote();
  });
  singleFetchModeBtn?.addEventListener("click", () => {
    changeFetchMode(FetchMode.Single);
  });
  multipleFetchModeBtn?.addEventListener("click", () => {
    changeFetchMode(FetchMode.Multiple);
  });
};

addListeners();
changeFetchMode(FetchMode.Single);
getRandomQuote();
