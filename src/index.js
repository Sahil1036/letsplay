const menu = document.querySelector(".nav_menu");
const show = document.querySelector(".right ul");
const list = document.querySelectorAll(".right ul li");
menu.addEventListener("click", () => {
  if (show.style.transform === "scale(1)") show.style.transform = "scale(0)";
  else show.style.transform = "scale(1)";
});

list.forEach((e) => {
  e.addEventListener("click", () => {
    if (screen.width <= 768) {
      setTimeout(()=>{window.scrollBy(0, -100);},);
      show.style.transform = "scale(0)";
    }
  });
});
