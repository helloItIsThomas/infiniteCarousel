import { someData } from "../data/someData";

function getNewProject() {
  const numSlides = 5;
  const numProjects = someData.projects.length;
  const newProject = someData.projects[numSlides % numProjects];

  return newProject;
}

function populateFiveSlides(containerForItems) {
  // const lastItem = containerForItems.lastElementChild;
  // const firstItem = containerForItems.firstElementChild;
  // const lastClone = lastItem.cloneNode(true);
  // const firstClone = firstItem.cloneNode(true);
  const items = document.querySelectorAll(".item");
  const numSlides = 5;
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

  let clickCounter = 0;

  prevBtn.addEventListener("click", () => {
    const numSlides = 5;

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
        console.log(setNewProjectToMe.name);
        const lastClone = lastChild.cloneNode(true);

        containerForItems.prepend(lastClone);
        containerForItems.removeChild(lastChild);
        gsap.set(containerForItems, {
          x: `-=${moveVal}%`,
        });

        clickCounter = (clickCounter + 1) % numSlides;
      },
    });
  });
});

function makeNewTimeline(containerForItems, moveVal, dur) {
  const tl = gsap.timeline({
    paused: true,
  });

  tl.to(containerForItems, {
    x: `+=${moveVal}%`,
    duration: dur,
    ease: "power2.inOut",
    onComplete: () => {
      console.log("done");
    },
  }).call(
    () => {
      console.log("midway");
      const thirdItem = containerForItems.children[3];
      const thirdClone = thirdItem.cloneNode(true);
      const lastChild = containerForItems.lastElementChild;

      containerForItems.replaceChild(
        thirdClone,
        containerForItems.firstElementChild
      );
    },
    [],
    "<50%"
  );

  return tl;
}
