import page from "../node_modules/page/page.mjs";
import { html, render } from "../node_modules/lit-html/lit-html.js";
import { getToken } from "./authentication.js";
import { updateNavBar } from "./app.js";

async function doCreate(data) {
  const URL = "http://localhost:3030/data/motorcycles";
  const body = JSON.stringify(data);
  const token = getToken();
  const options = {
    method: "POST",
    headers: {
      "X-Authorization": token,
      "Content-Type": "application/json",
    },
    body,
  };

  const request = await fetch(URL, options);
  return request.ok
}

async function onSubmit(e, ctx) {
  e.preventDefault();
  const formData = new FormData(e.target);

  const model = formData.get("model");
  const imageUrl = formData.get("imageUrl");
  const year = formData.get("year");
  const mileage = formData.get("mileage");
  const contact = formData.get("contact");
  const about = formData.get("about");

  if (
    imageUrl == "" ||
    year == "" ||
    mileage == "" ||
    contact == "" ||
    about == ""
  ) {
    return alert("Bad input!");
  }
  const data = {
    model: formData.get("model"),
    imageUrl: formData.get("imageUrl"),
    year: formData.get("year"),
    mileage: formData.get("mileage"),
    contact: formData.get("contact"),
    about: formData.get("about"),
  };

  if(await doCreate(data)){
    e.target.reset();
    ctx.page.redirect("/dashboard");
    updateNavBar();
  }
}

const createTemplate = (
  ctx
) => html` <!-- Create Page (Only for logged-in users) -->
  <section id="create">
    <h2>Add Motorcycle</h2>
    <div class="form">
      <h2>Add Motorcycle</h2>
      <form class="create-form" @submit=${e => onSubmit(e, ctx)}>
        <input type="text" name="model" id="model" placeholder="Model" />
        <input
          type="text"
          name="imageUrl"
          id="moto-image"
          placeholder="Moto Image"
        />
        <input type="number" name="year" id="year" placeholder="Year" />
        <input
          type="number"
          name="mileage"
          id="mileage"
          placeholder="mileage"
        />
        <input type="text" name="contact" id="contact" placeholder="contact" />
        <textarea
          id="about"
          name="about"
          placeholder="about"
          rows="10"
          cols="50"
        ></textarea>
        <button type="submit">Add Motorcycle</button>
      </form>
    </div>
  </section>`;

export function showCreate(ctx) {
  render(createTemplate(ctx), document.querySelector("main"));
}
