/* This is a function that is listening for the DOM to be ready. */
document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

const initApp = () => {};

// querySelectorAll function
function qsAll(selector, parent = document) {
  return [...parent.querySelectorAll(selector)];
}

// querySelector function
function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
