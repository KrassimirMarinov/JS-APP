import page from "../node_modules/page/page.mjs";
import { delSessionStorage, getToken } from "./authentication.js";

export async function logOut() {
  const URL = "http://localhost:3030/users/logout";

  const token = getToken();

  const options = {
    method: "GET",
    headers: {
      "X-Authorization": token,
    },
  };

  const request = await fetch(URL, options);
  const response = await request.json();
  if (request.ok) {
    delSessionStorage();
  }
}
