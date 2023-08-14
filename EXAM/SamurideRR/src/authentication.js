const tokenName = "accessToken";
const ID = "_id";
const email = "email";

export function getToken() {
  return sessionStorage.getItem(tokenName);
}

export function setStorage(obj) {
  sessionStorage.setItem(tokenName, obj.accessToken);
  sessionStorage.setItem(ID, obj._id);
  sessionStorage.setItem(email, obj.email);
}
export function delSessionStorage() {
  sessionStorage.removeItem(tokenName);
  sessionStorage.removeItem(ID);
  sessionStorage.removeItem(email);
}
export function returnUserID (){
return sessionStorage.getItem('_id')
}