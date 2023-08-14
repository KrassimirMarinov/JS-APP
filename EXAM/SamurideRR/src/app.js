import page from "../node_modules/page/page.mjs";
import { html, render } from "../node_modules/lit-html/lit-html.js";
import { getToken } from "./authentication.js";
import { homePage } from "./home.js";
import { showLogin } from "./login.js";
import { showRegister } from "./register.js";
import { logOut } from "./logout.js";
import { showDashboard } from "./dashBoard.js";
import { showCreate } from "./crate.js";
import { detailsPage } from "./details.js";
import { editPage } from "./edit.js";

page("/", homePage);
page("/register", showRegister);
page("/login", showLogin);
page("/dashboard", showDashboard);
page("/create", showCreate)
page("/details/:id", detailsPage)
page("/edit/:id", editPage)
page.start();

updateNavBar();
export function updateNavBar() {
  let token = getToken();
  let template;
  if (token) {
    template = () => html`
      <div>
        <a href="/dashboard">Motorcycles</a>
        <a href="#">Search</a>
      </div>

      <!-- Logged-in users -->
      <div class="user">
        <a href="/create">Add Motorcycle</a>
        <a @click=${logOut}>Logout</a>
      </div>
    `;
  } else {
    template = () => html` <div>
        <a href="/dashboard">Motorcycles</a>
        <a href="#">Search</a>
      </div>
      <!-- Guest users -->
      <div class="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
      </div>`;
  }

  render(template(), document.querySelector("nav"));
}
