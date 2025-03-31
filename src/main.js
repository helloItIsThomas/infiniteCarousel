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
  const numLeftover = numSlides - someData.projects.length;

  let tl = gsap.timeline();

  prevBtn.addEventListener("click", () => {
    tl.add(
      gsap.to(containerForItems, {
        x: `+=${moveVal}%`,
        duration: dur,
        ease: "power2.inOut",
        onComplete: () => {
          const setNewProjectToMe =
            containerForItems.children[5 - numLeftover - 1];

          // lastChild be moved to the front.
          const lastChild = containerForItems.lastElementChild;

          lastChild.querySelector(".item-img").src =
            setNewProjectToMe.querySelector(".item-img").src;

          const lastClone = lastChild.cloneNode(true);
          containerForItems.prepend(lastClone);
          containerForItems.removeChild(lastChild);
          gsap.set(containerForItems, {
            x: `-=${moveVal}%`,
          });
        },
      })
    );
  });

  nextBtn.addEventListener("click", () => {
    tl.add(
      gsap.to(containerForItems, {
        x: `-=${moveVal}%`,
        duration: dur,
        ease: "power2.inOut",
        onComplete: () => {
          console.log("numLeftover: ", numLeftover);

          const setNewProjectToMe = containerForItems.children[numLeftover];

          // this will need to be moved to the end
          const firstChild = containerForItems.firstElementChild;

          firstChild.querySelector(".item-img").src =
            setNewProjectToMe.querySelector(".item-img").src;

          const firstClone = firstChild.cloneNode(true);
          containerForItems.append(firstClone);
          containerForItems.removeChild(firstChild);
          gsap.set(containerForItems, {
            x: `+=${moveVal}%`,
          });
        },
      })
    );
  });
});
