const scrollButton = document.getElementById("scrollBtn");
const menu = document.querySelector(".menu");
const nav = document.querySelector(".main-nav");

window.onscroll = function () {
  showBtn();
  colorMenu();
};

function showBtn() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollButton.style.display = "block";
  } else {
    scrollButton.style.display = "none";
  }
}
function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

function showMenu() {
  if (menu.style.display === "flex") {
    menu.style.display = "none";
  } else {
    menu.style.display = "flex";
  }
}

function colorMenu() {
  if (
    document.body.scrollTop > 850 ||
    document.documentElement.scrollTop > 850
  ) {
    nav.style.backgroundColor = "#060c1bdc";
  } else {
    nav.style.backgroundColor = "none";
  }
}
