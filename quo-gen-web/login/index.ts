import { login } from "../src/auth.module";
import "../src/style.css";
import { showErrorToast } from "../src/toast-helper";

const addListeners = () => {
  const loginForm = document.querySelector("#loginForm");
  loginForm?.addEventListener("submit", (ev: Event) => {
    ev.preventDefault();
    const form = ev.target as HTMLFormElement
    const username = form.username.value;
    const password = form.password.value;

    login({
      username,
      password,
    })
        .then((res) => {
        if (res.user) {
          alert("Logged in successfully");
          window.location.replace("http://localhost:5173/")
        } else {
          throw new Error(res.message);
        }
      })
      .catch((err) => {
        showErrorToast("Could not login. Username or password incorrect")
      });
  });
};

addListeners();
