function getLang() {
  if (navigator.languages !== undefined) 
    return navigator.languages[0]; 
  return navigator.language;
}

window.addEventListener("load", () => {
  let previousPosition = 0.0;
  
  const nav = document.querySelector("nav");

  addEventListener("scroll", () => {
    const currentPositon = window.scrollY;

    if (currentPositon > 200.0 && currentPositon > previousPosition) {
      nav.classList.add("scrolling");
    } else {
      nav.classList.remove("scrolling");
    };

    previousPosition = currentPositon;
  });

  console.log(getLang())
});

