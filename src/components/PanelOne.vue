<template>
  <div data-scroll data-scroll-speed="1" class="panel">
    <v-img
      class="building"
      :width="'100vw'"
      :height="'auto'"
      src="https://raw.githubusercontent.com/eki1381/Storytelling/main/section1_building.png"
    ></v-img>
    <v-img
      class="ship"
      :width="'100vw'"
      :height="'auto'"
      src="https://raw.githubusercontent.com/eki1381/Storytelling/main/section1_ship.png"
    ></v-img>
    <v-img
      class="crowd"
      :width="'100vw'"
      :height="'auto'"
      src="https://raw.githubusercontent.com/eki1381/Storytelling/main/section1_crowd.png"
    ></v-img>
    <v-img
      class="cloud2"
      :width="'100vw'"
      :height="'auto'"
      src="https://raw.githubusercontent.com/eki1381/Storytelling/main/section1_cloud2.png"
    ></v-img>
    <v-img
      class="cloud1"
      :width="'100vw'"
      :height="'auto'"
      src="https://raw.githubusercontent.com/eki1381/Storytelling/main/section1_cloud2.png"
    ></v-img>
    <v-img
      class="cloud3"
      :width="'100vw'"
      :height="'auto'"
      src="https://raw.githubusercontent.com/eki1381/Storytelling/main/section1_cloud2.png"
    ></v-img>
    <v-img
      class="cloud4"
      :width="'100vw'"
      :height="'auto'"
      src="https://raw.githubusercontent.com/eki1381/Storytelling/main/section1_cloud2.png"
    ></v-img>
    <div class="center">
      <div class="title">
        'TANGIS DAN TAWA' <br />
        MIGRAN DI INDONESIA <br />
      </div>
      <div class="subtitle">Melihat Dua Sisi Potret Migrasi</div>
    </div>
  </div>
</template>

<script>
import LocomotiveScroll from "locomotive-scroll";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default {
  methods: {
    initiatePanel() {
      gsap.fromTo(
        ".panel",
        { opacity: "0" },
        { opacity: "100", duration: 25, ease: "power2.in" }
      );
    },
    moveShip() {
      gsap.fromTo(
        ".ship",
        { x: "-50%" },
        { x: "130%", duration: 40, repeat: -1, ease: "power2.in" }
      );
    },
    moveCloud() {
      gsap.fromTo(
        ".cloud1",
        { x: "0%" },
        { x: "100%", duration: 70, repeat: -1 }
      );
      gsap.fromTo(
        ".cloud2",
        { x: "-20%" },
        { x: "100%", duration: 80, repeat: -1 }
      );
      gsap.fromTo(
        ".cloud3",
        { x: "10%" },
        { x: "100%", duration: 100, repeat: -1 }
      );
      gsap.fromTo(
        ".cloud4",
        { x: "30%" },
        { x: "100%", duration: 90, repeat: -1 }
      );
    },
  },
  mounted() {
    this.initiatePanel();
    this.moveShip();
    this.moveCloud();
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
  display: flex;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
  margin: auto;
  align-items: flex-start;
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

.building {
  position: absolute;
  bottom: 0;
}

.crowd {
  position: absolute;
  bottom: 0;
}

.cloud2 {
  position: absolute;
  bottom: 0;
}

.cloud1 {
  position: absolute;
  bottom: 10;
}

.cloud3 {
  position: absolute;
  bottom: 20;
}

.cloud4 {
  position: absolute;
  bottom: 15;
}

.ship {
  position: absolute;
  bottom: 0;
}

.title {
  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  font-weight: bold;
  font-style: normal;
  font-size: 48pt;
  color: var(--text-color);
}

.subtitle {
  font-family: "Sanchez", serif;
  font-weight: 400;
  font-style: normal;
  font-size: 24pt; 
  color: var(--text-color);
}

.center {
  position: relative;
  display: flex;
  justify-content: center;
  text-align: center;
  top: 10%;
  z-index: 3;
  flex-direction: column;
  width: 100%; 
}
</style>