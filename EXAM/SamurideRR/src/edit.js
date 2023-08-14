import page from "../node_modules/page/page.mjs";
import { html, render } from "../node_modules/lit-html/lit-html.js";
import { getToken, returnUserID } from "./authentication.js";
import { getMotoByID } from "./details.js";

const editTemplate = (
  moto,
  ctx
) => html` <!-- Edit Page (Only for logged-in users) -->
  <section id="edit">
    <h2>Edit Motorcycle</h2>
    <div class="form">
      <h2>Edit Motorcycle</h2>
      <form class="edit-form" @submit=${(e) => onEdit(e, ctx)}>
        <input
          type="text"
          name="model"
          id="model"
          placeholder="Model"
          value=${moto.model}
        />
        <input
          type="text"
          name="imageUrl"
          id="moto-image"
          placeholder="Moto Image"
          value=${moto.imageUrl}
        />
        <input
          type="number"
          name="year"
          id="year"
          placeholder="Year"
          value=${moto.year}
        />
        <input
          type="number"
          name="mileage"
          id="mileage"
          placeholder="mileage"
          value=${moto.mileage}
        />
        <input
          type="number"
          name="contact"
          id="contact"
          placeholder="contact"
          value=${moto.contact}
        />
        <textarea
          id="about"
          name="about"
          placeholder=${moto.about}
          rows="10"
          cols="50"
          value=${moto.about}
        ></textarea>
        <button type="submit">Edit Motorcycle</button>
      </form>
    </div>
  </section>`;

async function onEdit(e, ctx) {
  e.preventDefault();
  const id = ctx.params.id;

  const formData = new FormData(e.target);

  const model = formData.get("model");
  const imageUrl = formData.get("imageUrl");
  const year = formData.get("year");
  const mileage = formData.get("mileage");
  const contact = formData.get("contact");
  const about = formData.get("about");

  if (
    model == "" ||
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

  if (await editReq(data, id)) {
    e.target.reset();
    ctx.page.redirect(`/details/${id}`);
    // updateNavBar();
  }
}

async function editReq(data, id) {
  const URL = `http://localhost:3030/data/motorcycles/${id}`;
  const body = JSON.stringify(data);
  const token = getToken();
  const options = {
    method: "PUT",
    headers: {
      "X-Authorization": token,
      "Content-Type": "application/json",
    },
    body,
  };

  const request = await fetch(URL, options);
  return request.ok;
}

export async function editPage(e, ctx) {
  e.preventDefault();
  const id = ctx.params.id;
  const moto = await getMotoByID(id);
  console.log(moto);

  render(editTemplate(moto, ctx), document.querySelector("main"));
}
