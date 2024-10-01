import { login } from "../src/auth.module";
import "../src/style.css";
import { showErrorToast } from "../src/toast-helper";

const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const isValidEmail = (email: string) => {
    return emailRegex.test(email);
};
const addListeners = () => {
  const loginForm = document.querySelector("#loginForm");
  loginForm?.addEventListener("submit", (ev: Event) => {
    ev.preventDefault();
    const form = ev.target as HTMLFormElement
    const username = form.username.value;
    if (!isValidEmail(username)) {
      showErrorToast("Could not login. Username or password incorrect")
    }
    const password = "";
    login({
      username,
      password,
    })
      .then((res) => {
        if (res) {
          alert("Logged in successfully");
          window.location.replace("http://localhost:5173/")
        } else {
          throw new Error(res.message);
        }
      })
      .catch((err) => {
        // use showErrorToast
      });
  });
};

addListeners();
