import { login } from "../src/auth.module";
import "../src/style.css";
import { showErrorToast } from "../src/toast-helper";

const addListeners = () => {
  const loginForm = document.querySelector("#loginForm");
  loginForm?.addEventListener("submit", (ev: Event) => {
    ev.preventDefault();
    const username = "";
    const password = "";
    // hint: user form elements to get the input value
    login({
      username,
      password,
    })
      .then((res) => {
        if (res.user) {
          alert("Logged in successfully");
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
