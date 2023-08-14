import { html } from "../../node_modules/lit-html/lit-html.js"
import { searchAlbum } from "../src/dataSearch.js"

const searchTemplate = (isClicked, onSearch, fruits) => html` <section id="search">
<div class="form">
  <h4>Search</h4>
  <form class="search-form">
    <input type="text" name="search" id="search-input" />
    <button class="button-list">Search</button>
  </form>
</div>
<h4>Results:</h4>

${isClicked ? html`
<div class="search-result">
${fruits.length > 0 ? html`${fruits.map(albumTemplate)}` : html`<p class="no-result">No result.</p>`}`
: html`<p class="no-result">No result.</p>`}
</div>
</section>`

const albumTemplate = (fruit) => html`
  <!--If there are matches display a div with information about every motorcycle-->
  <div class="motorcycle">
    <img src="${fruit.imageUrl}" alt="example1" />
    <h3 class="model">${fruit.model}</h3>
    <a class="details-btn" href="catalog/${fruit._id}">More Info</a>
  </div>`

export async function searchPage(ctx) {

    ctx.render(searchTemplate(false, onSearch))

    async function onSearch(e) {
        e.preventDefault()
        const input = document.querySelector("#search-input")
        const query = input.value
        if (!query) return alert("Нема такава простотия!!!")

        const fruits = await searchAlbum(query)
        console.log(fruits)
        ctx.render(searchTemplate(true, onSearch, fruits))
    }

}