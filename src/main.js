window.addEventListener("load", () => {
  const containerForItems = document.querySelector(".containerForItems");

  const lastItem = containerForItems.lastElementChild;
  const firstItem = containerForItems.firstElementChild;
  const firstClone = firstItem.cloneNode(true);
  const lastClone = lastItem.cloneNode(true);
  containerForItems.appendChild(lastClone);
  containerForItems.prepend(firstClone);

  const items = document.querySelectorAll(".item");
  const itemContainers = document.querySelectorAll(".item-container");

  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  const moveVal = 100 / items.length;

  const dur = 0.5;

  prevBtn.addEventListener("click", () => {
    let tl = makeNewTimeline(containerForItems, moveVal, dur);

    tl.restart();
  });
});

// tl.to(containerForItems, {
// x: `+=${moveVal}%`,
// duration: dur,
// ease: "power2.inOut",
// onComplete: () => {
// console.log("done");
// },
// }).call(
// () => {
// console.log("midway");
// const thirdItem = containerForItems.children[3];
// const thirdClone = thirdItem.cloneNode(true);
// containerForItems.replaceChild(
// thirdClone,
// containerForItems.firstElementChild
// );
// },
// [],
// "<50%"
// );

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

      // containerForItems.prepend(thirdClone);
      // containerForItems.remove(thirdClone);
      // const thirdItem = containerForItems.children[3];
      // const thirdClone = thirdItem.cloneNode(true);
      // containerForItems.replaceChild(
      // thirdClone,
      // containerForItems.firstElementChild
      // );
    },
    [],
    "<50%"
  );

  return tl;
}
