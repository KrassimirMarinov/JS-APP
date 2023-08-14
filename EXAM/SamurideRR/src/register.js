import page from "../node_modules/page/page.mjs";
import { html, render } from "../node_modules/lit-html/lit-html.js";
import { updateNavBar } from "./app.js";
import { setStorage } from "./authentication.js";

async function register(email, password) {
  const URL = "http://localhost:3030/users/register";

  const body = JSON.stringify({
    email: email,
    password: password,
  });

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  };

  const request = await fetch(URL, options);
  const response = await request.json();

  if (request.ok) {
    setStorage(response);
  }

  return request.ok;
}

async function onSubmit(e, ctx) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const email = formData.get("email");
  const password = formData.get("password");
  const rePassword = formData.get("re-password");

  if (email == "" || password == "" || rePassword == "") {
    return alert("All fields reqired!");
  }
  if (password !== rePassword) {
    return alert("Passwords must match!");
  }

  if (await register(email, password)) {
    e.target.reset();
    ctx.page.redirect("/");
    updateNavBar();
  } else {
    return alert("Bad Request!");
  }
}

const registerTemplate = (
  ctx
) => html` <!-- Register Page (Only for Guest users) -->
  <section id="register">
    <div class="form">
      <h2>Register</h2>
      <form class="register-form" @submit=${(e) => onSubmit(e, ctx)}>
        <input
          type="text"
          name="email"
          id="register-email"
          placeholder="email"
        />
        <input
          type="password"
          name="password"
          id="register-password"
          placeholder="password"
        />
        <input
          type="password"
          name="re-password"
          id="repeat-password"
          placeholder="repeat password"
        />
        <button type="submit">register</button>
        <p class="message">Already registered? <a href="#">Login</a></p>
      </form>
    </div>
  </section>`;

export function showRegister(ctx) {
  render(registerTemplate(ctx), document.querySelector("main"));
}
