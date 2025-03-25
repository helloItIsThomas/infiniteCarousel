function populateFiveSlides(containerForItems) {
  const lastItem = containerForItems.lastElementChild;
  const firstItem = containerForItems.firstElementChild;
  const lastClone = lastItem.cloneNode(true);
  const firstClone = firstItem.cloneNode(true);
  containerForItems.appendChild(firstClone);
  containerForItems.prepend(lastClone);

  const items = document.querySelectorAll(".item");
  return items;
}

window.addEventListener("load", () => {
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const containerForItems = document.querySelector(".containerForItems");

  const items = populateFiveSlides(containerForItems);

  const moveVal = 100 / items.length;
  const dur = 0.5;

  prevBtn.addEventListener("click", () => {
    gsap.to(containerForItems, {
      x: `+=${moveVal}%`,
      duration: dur,
      ease: "power2.inOut",
      onComplete: () => {
        const lastItem = containerForItems.lastElementChild;
        const lastClone = lastItem.cloneNode(true);
        const lastChild = containerForItems.lastElementChild;
        containerForItems.prepend(lastClone);
        containerForItems.removeChild(lastChild);
        gsap.set(containerForItems, {
          x: `-=${moveVal}%`,
        });
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
