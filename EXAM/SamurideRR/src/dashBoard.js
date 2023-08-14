// import page from "../node_modules/page/page.mjs";
import { html, render } from "../node_modules/lit-html/lit-html.js";
import { returnUserID } from "./authentication.js";

async function getData() {
  const URL = "http://localhost:3030/data/motorcycles?sortBy=_createdOn%20desc";

  const options = {
    method: "GET",
  };

  const request = await fetch(URL, options);
  const response = await request.json();

  return response;
}

const motoTemplate = (moto, userId) => html`
  <div class="motorcycle">
    <img src="${moto.imageUrl}" alt="example1" />
    <h3 class="model">${moto.model}</h3>
    <p class="year">Year: ${moto.year}</p>
    <p class="mileage">Mileage: ${moto.mileage} km.</p>
    <p class="contact">Contact Number: ${moto.contact}</p>
    <a class="details-btn" href="/details/${moto._id}">More Info</a>
  </div>
`;

const dashBoardTemplate = (moto, userId) => html` <!-- Dashboard page -->
  <h2>Available Motorcycles</h2>
  <section id="dashboard">
    <!-- Display a div with information about every post (if any)-->
    ${moto.length === 0
      ? html`<h2 class="no-avaliable">No avaliable motorcycles yet.</h2>`
      : moto.map((moto) => motoTemplate(moto, userId))}
  </section>`;

export async function showDashboard(ctx) {
  const data = await getData();
console.log(data)
  const userID = returnUserID();
  render(dashBoardTemplate(data, userID), document.querySelector("main"));
}
