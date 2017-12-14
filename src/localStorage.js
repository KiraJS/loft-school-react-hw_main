export function getTokenFromLocalStorage() {
  return localStorage.getItem("jwt");
}

export function setTokenToLocalStorage(token) {
  localStorage.setItem("jwt", token);
}

export function removeTokenFromLocalStorage() {
  localStorage.removeItem("jwt");
}
