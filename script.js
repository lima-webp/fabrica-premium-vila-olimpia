const bx = document.querySelector(".bx");
const closeMenu = document.getElementById("close-menu");
const nav = document.getElementById("navbar");
const body = document.querySelector("body");

bx.addEventListener("click", () => {
  nav.classList.add("show");
  body.style.overflow = "hidden";
});

closeMenu.addEventListener("click", () => {
  nav.classList.remove("show");
  body.style.overflow = "auto";
});

// ===================
document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

  // SCROLL SMOOTHER
  ScrollSmoother.create({
    smooth: 1.5,
    effects: true,
    smoothTouch: 0.1,
  });

  const showAnim = gsap
    .from("nav", {
      yPercent: -130,
      paused: true,
      duration: 0.5,
    })
    .progress(1);

  ScrollTrigger.create({
    start: "top top",
    end: "max",
    // markers: true,
    onUpdate: (self) => {
      self.direction === -1 ? showAnim.play() : showAnim.reverse();
    },
  });

  if (document.getElementById("portfolio")) {
    const horizontalSections = gsap.utils.toArray(".horiz-gallery-wrapper");

    ScrollTrigger.matchMedia({
      "(min-width: 1216px)": function () {
        horizontalSections.forEach((sec) => {
          const pinWrap = sec.querySelector(".horiz-gallery-strip");

          let pinWrapWidth;
          let horizontalScrollLength;

          function refresh() {
            pinWrapWidth = pinWrap.scrollWidth;
            horizontalScrollLength = pinWrapWidth - window.innerWidth;
          }

          refresh();

          gsap.to(pinWrap, {
            x: () => -horizontalScrollLength,
            ease: "none",
            scrollTrigger: {
              trigger: sec,
              start: "center center",
              end: () => `+=${pinWrapWidth}`,
              pin: true,
              scrub: true,
              invalidateOnRefresh: true,
            },
          });

          ScrollTrigger.addEventListener("refreshInit", refresh);
        });
      },
    });
  }
});
