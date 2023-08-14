import page from "../node_modules/page/page.mjs";
import { html, render } from "../node_modules/lit-html/lit-html.js";
import { getToken, returnUserID } from "./authentication.js";
import { editPage } from "./edit.js";
// import { updateNavBar } from "./app.js";

const detailsTemplate = (moto, ctx) => html` <!-- Details page -->

  <section id="details">
    <div id="details-wrapper">
      <img id="details-img" src="${moto.imageUrl}" alt="example1" />
      <p id="details-title">${moto.model}</p>
      <div id="info-wrapper">
        <div id="details-description">
          <p class="year">Year: ${moto.year}</p>
          <p class="mileage">Mileage: ${moto.mileage} km.</p>
          <p class="contact">Contact Number: ${moto.contact}</p>
          <p id="motorcycle-description">${moto.about}</p>
        </div>
        <!--Edit and Delete are only for creator-->
        <div id="action-buttons">${checkForOwner(moto, ctx)}</div>
      </div>
    </div>
  </section>`;

function checkForOwner(moto, ctx) {
  const USer = returnUserID();
  if (USer == moto._ownerId) {
    return html` <a @click=${(e) => editPage(e, ctx)} id="edit-btn">Edit</a>
      <a @click=${(e) => onDelete(e, ctx)} id="delete-btn">Delete</a>`;
  } else {
    return html``;
  }
}

async function onDelete(event, ctx) {
  event.preventDefault();
  const id = ctx.params.id;
  const confirmed = confirm("DO YOU WANT TO DELETE?");
  if (confirmed) {
    await deleteMOTO(id);
    ctx.page.redirect("/dashboard");
    // updateNavBar();
  }
}

export async function detailsPage(ctx) {
  const id = ctx.params.id;
  const moto = await getMotoByID(id);

  const userID = returnUserID();

  render(detailsTemplate(moto, ctx), document.querySelector("main"));
}

export async function getMotoByID(id) {
  const URL = `http://localhost:3030/data/motorcycles/${id}`;

  const token = getToken();
  const options = {
    method: "GET",
    // headers: {
    //   "X-Authorization": token,
    // },
  };

  const request = await fetch(URL, options);
  const response = await request.json();
  if (request.ok) {
    return response;
  }
}

async function deleteMOTO(id) {
  const URL = `http://localhost:3030/data/motorcycles/${id}`;
  const token = getToken();
  const options = {
    method: "DELETE",
    headers: {
      "X-Authorization": token,
    },
  };
  const request = await fetch(URL, options);
  console.log(request);
}
