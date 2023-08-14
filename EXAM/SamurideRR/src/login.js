import page from "../node_modules/page/page.mjs";
import { html, render } from "../node_modules/lit-html/lit-html.js";
import { updateNavBar } from "./app.js";
import { setStorage } from "./authentication.js";

async function login(email, password) {
  const URL = "http://localhost:3030/users/login";

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
  
  return(request.ok)
}

async function onSubmit(e, ctx) {
  e.preventDefault();

  const formData = new FormData(e.target);

  const email = formData.get("email");
  const password = formData.get("password");

  if (email == "" || password == "") {
    return alert("All fields reqired!");
  }

 
 

  if(await login(email, password)){
    e.target.reset();
    ctx.page.redirect("/");
    updateNavBar();
  }else{
    return alert("Bad Request!");
  }

}

export function showLogin(ctx) {
  render(loginTemplate(ctx), document.querySelector("main"));
}

const loginTemplate = (ctx) => html` <!-- Login Page (Only for Guest users) -->
  <section id="login">
    <div class="form">
      <h2>Login</h2>
      <form class="login-form" @submit=${(e) => onSubmit(e, ctx)}>
        <input type="text" name="email" id="email" placeholder="email" />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        <button type="submit">login</button>
        <p class="message">Not registered? <a href="#">Create an account</a></p>
      </form>
    </div>
  </section>`;
