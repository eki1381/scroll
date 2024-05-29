<template >
  <div class="horizontal-scroll">
    <div class="pin-wrap">
      <v-img
        class="slide1"
        :width="'100vw'"
        :height="'auto'"
        src="https://raw.githubusercontent.com/eki1381/Storytelling/main/section3_slide1.png"
      ></v-img>
      <v-img
        class="slide2"
        :width="'100vw'"
        :height="'auto'"
        src="https://raw.githubusercontent.com/eki1381/Storytelling/main/section3_slide2.png"
      ></v-img>
    </div>
  </div>
</template>

<script>
import LocomotiveScroll from "locomotive-scroll";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default {
  mounted() {
    window.addEventListener("load", function () {
      gsap.registerPlugin(ScrollTrigger);

      const pageContainer = document.querySelector(".container");
      pageContainer.setAttribute("data-scroll-container", "");

      const scroller = new LocomotiveScroll({
        el: pageContainer,
        inertia: 0.8,
        smooth: true,
        getDirection: true,
      });

      scroller.on("scroll", function (t) {
        document.documentElement.setAttribute("data-direction", t.direction);
      });

      scroller.on("scroll", ScrollTrigger.update);

      ScrollTrigger.scrollerProxy(pageContainer, {
        scrollTop(value) {
          return arguments.length
            ? scroller.scrollTo(value, 0, 0)
            : scroller.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return {
            left: 0,
            top: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: pageContainer.style.transform ? "transform" : "fixed",
      });

      // Pinning and horizontal scrolling
      let horizontalSections = document.querySelectorAll(".horizontal-scroll");

      horizontalSections.forEach((horizontalSection) => {
        let pinWrap = horizontalSection.querySelector(".pin-wrap");
        let pinWrapWidth = pinWrap.offsetWidth;
        let horizontalScrollLength = pinWrapWidth - window.innerWidth;
        gsap.to(pinWrap, {
          scrollTrigger: {
            scroller: "[data-scroll-container]",
            scrub: true,
            trigger: horizontalSection,
            pin: true,
            start: "top top",
            end: () => `+=${pinWrapWidth}`,
            invalidateOnRefresh: true,
          },
          x: -horizontalScrollLength,
          ease: "none",
        });
      });

      /* COLOR CHANGER */

      const scrollColorElems = document.querySelectorAll("[data-bgcolor]");
      scrollColorElems.forEach((colorSection, i) => {
        const prevBg = i === 0 ? "" : scrollColorElems[i - 1].dataset.bgcolor;
        const prevText =
          i === 0 ? "" : scrollColorElems[i - 1].dataset.textcolor;

        ScrollTrigger.create({
          trigger: colorSection,
          scroller: "[data-scroll-container]",
          start: "top 50%",
          onEnter: () =>
            gsap.to("body", {
              backgroundColor: colorSection.dataset.bgcolor,
              color: colorSection.dataset.textcolor,
              overwrite: "auto",
            }),
          onLeaveBack: () =>
            gsap.to("body", {
              backgroundColor: prevBg,
              color: prevText,
              overwrite: "auto",
            }),
        });
      });

      ScrollTrigger.addEventListener("refresh", () => scroller.update());

      ScrollTrigger.refresh();
    });
  },
};
</script>

<style scoped>
:root {
  --text-color: #111;
  --bg-color: #b9b3a9;
}

body {
  font-family: termina, sans-serif;
  color: var(--text-color);
  background: var(--bg-color);

  transition: 0.3s ease-out;
  overflow-x: hidden;
  max-width: 100%;
  width: 100%;
  overscroll-behavior: none;
}

section:not(.horizontal-scroll) {
  min-height: 100vh;
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
  padding: 50px 10vw;
  margin: auto;
  place-items: center;
}

img {
  height: 80vh;
  width: auto;
  object-fit: cover;
}

h1 {
  font-size: 5rem;
  line-height: 1;
  font-weight: 800;
  margin-bottom: 1rem;
  position: absolute;
  top: 10vw;
  left: 10vw;
  z-index: 4;
  overflow-wrap: break-word;
  hyphens: auto;

  @media (max-width: 768px) {
    font-size: 16vw;
  }

  span {
    display: block;
  }
}

h2 {
  font-size: 2rem;
  max-width: 400px;
}

.credit {
  font-family: Termina, sans-serif;
  a {
    color: var(--text-color);
  }
}

* {
  box-sizing: border-box;
}

.horizontal-scroll {
  height: 100vh;
  overflow: hidden;
  display: flex;
  left: 0;
}

.pin-wrap {
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 50px 10vw;

  & > * {
    min-width: 60vw;
    padding: 0 5vw;
  }
}

p {
  position: absolute;
  bottom: 10vw;
  right: 10vw;
  width: 200px;
  line-height: 1.5;
}

.island1 {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 3;
}

.island2 {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 3;
}
</style>