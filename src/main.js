import { someData } from "../data/someData";

function populateFiveSlides(containerForItems) {
  const items = document.querySelectorAll(".item");
  const numProjects = someData.projects.length;

  items.forEach((item, index) => {
    const img = item.querySelector(".item-img");
    img.src = someData.projects[index % numProjects].image;
  });
}

window.addEventListener("load", () => {
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const containerForItems = document.querySelector(".containerForItems");

  populateFiveSlides(containerForItems);
  const items = document.querySelectorAll(".item");

  const moveVal = 100 / items.length;
  const dur = 0.5;
  const numSlides = 5;
  let clickCounter = 0;

  const numLeftover = numSlides - someData.projects.length;
  console.log("numLeftover: ", numLeftover);

  prevBtn.addEventListener("click", () => {
    clickCounter = (clickCounter + 1) % numSlides;
    gsap.to(containerForItems, {
      x: `+=${moveVal}%`,
      duration: dur,
      ease: "power2.inOut",
      onComplete: () => {
        const numProjects = someData.projects.length;

        const setNewProjectToMe =
          someData.projects[Math.abs(numSlides - clickCounter) % numProjects];

        const lastChild = containerForItems.lastElementChild;

        lastChild.querySelector(".item-img").src = setNewProjectToMe.image;
        const lastClone = lastChild.cloneNode(true);

        containerForItems.prepend(lastClone);
        containerForItems.removeChild(lastChild);
        gsap.set(containerForItems, {
          x: `-=${moveVal}%`,
        });
      },
    });
  });
});
