import { register } from "../src/auth.module";
import "../src/style.css";
import { showErrorToast } from "../src/toast-helper";

const addListeners = () => {
  const registerForm = document.querySelector("#registerForm");
  registerForm?.addEventListener("submit", (ev: Event) => {
    const username = "";
    const password = "";
    // hint: user form elements to get the input value
    register({
      username,
      password,
    })
      .then((res) => {
        if (res.user) {
          alert("Registered successfully");
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
