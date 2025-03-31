import { someData } from "../data/someData";
import { mathMod } from "./utils";

function populateFiveSlides() {
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
  const numProjects = someData.projects.length;
  console.log("numProjects: ", numProjects);
  let clickOffset = 0;

  const numLeftover = numSlides - someData.projects.length;
  console.log("numLeftover: ", numLeftover);

  prevBtn.addEventListener("click", () => {
    gsap.to(containerForItems, {
      x: `+=${moveVal}%`,
      duration: dur,
      ease: "power2.inOut",
      onComplete: () => {
        const setProjectNum = 0;

        // const setNewProjectToMe = someData.projects[setProjectNum];
        const setNewProjectToMe =
          containerForItems.children[5 - numLeftover - 1];
        console.log("setNewProjectToMe: ", setNewProjectToMe);

        clickOffset = (clickOffset + 1) % numSlides;

        const lastChild = containerForItems.lastElementChild;

        lastChild.querySelector(".item-img").src =
          setNewProjectToMe.querySelector(".item-img").src;
        const lastClone = lastChild.cloneNode(true);

        containerForItems.prepend(lastClone);
        containerForItems.removeChild(lastChild);
        gsap.set(containerForItems, {
          x: `-=${moveVal}%`,
        });
        console.log("clickOffset: ", clickOffset);
        console.log(" ___~~~___ ");
      },
    });
  });
});
