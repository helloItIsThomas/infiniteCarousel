window.addEventListener("load", () => {
  const items = document.querySelectorAll(".item");
  const itemContainers = document.querySelectorAll(".item-container");
  const containerForItems = document.querySelector(".containerForItems");

  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  prevBtn.addEventListener("click", () => {
    gsap.to(containerForItems, {
      x: "+=33%",
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        const lastItem = containerForItems.lastElementChild;
        containerForItems.prepend(lastItem);
        gsap.set(containerForItems, { x: "-=33%" });
      },
    });
  });

  nextBtn.addEventListener("click", () => {
    gsap.to(containerForItems, {
      x: "-=33%",
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        const firstItem = containerForItems.querySelector(".item-container");
        containerForItems.appendChild(firstItem);
        gsap.set(containerForItems, { x: "+=33%" });
      },
    });
  });
});
