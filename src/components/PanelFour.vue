<template>
  <div class="panel" data-scroll data-scroll-speed="-3">
    <div>
      <div>
        <div class="title">
          Sejarah mencatat migrasi telah dilakukan penduduk 
          Indonesia sejak zaman kolonial.
        </div>
        <div class="subtitle">
          Pemerintah Indonesia berupaya untuk memeratakan penduduk melalui
          program
          <br />
          transmigrasi
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
import LocomotiveScroll from "locomotive-scroll";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default {
  methods:{
    initiateScreen(){
      gsap.fromTo(
        ".center",
        { opacity: "0" },
        { opacity: "100", duration: 5, ease: "power2.in" }
      );
    }
  },
  mounted() {
    this.initiateScreen();
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
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap");

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

.panel {
  min-height: 100vh;
  width: 100%;
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
  padding: 50px 10vw;
  margin: auto;
  place-items: center;
  justify-content: center;
  text-align: center;
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

.text {
  position: absolute;
  top: 0;
  left: 0;
  margin-left: 20px;
  margin-top: 20px;
}

.title {
  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  font-weight: bold;
  font-style: normal;
  font-size: 42pt;
}

.subtitle {
  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  font-size: 20pt;
}
</style>