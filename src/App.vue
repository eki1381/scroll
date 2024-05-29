<template>
  <div class="container">
    <PanelOne data-textcolor="#000000" data-bgcolor="#9adff8" />
    <PanelTwo data-textcolor="#000000" data-bgcolor="#2d92b8" />
    <PanelThree data-textcolor="#000000" data-bgcolor="#FFDB5E" />
    <PanelFour data-bgcolor="#FFDB5E" data-textcolor="#000000" />
    <PanelFive data-bgcolor="#FFDB5E" data-textcolor="#000000" />
    <PanelSix data-textcolor="#000000" data-bgcolor="#40DFAF" />
    <PanelSeven data-textcolor="#000000" data-bgcolor="#40DFAF" />
    <PanelEight data-textcolor="#000000" data-bgcolor="#40DFAF" />
    <PanelNine data-textcolor="#000000" data-bgcolor="#40DFAF" />
    <PanelTen data-textcolor="#000000" data-bgcolor="#9adff8" />
    <PanelEleven data-textcolor="#000000" data-bgcolor="#9adff8" />
    <PanelTwelve data-textcolor="#000000" data-bgcolor="#9adff8" />
    <PanelThirteen data-textcolor="#000000" data-bgcolor="#9adff8" />
  </div>
</template>

<script>
import LocomotiveScroll from "locomotive-scroll";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onBeforeMount } from 'vue'

import PanelOne from "./components/PanelOne.vue";
import PanelTwo from "./components/PanelTwo.vue";
import PanelThree from "./components/PanelThree.vue";
import PanelFour from "./components/PanelFour.vue";
import PanelFive from "./components/PanelFive.vue";
import PanelSix from "./components/PanelSix.vue";
import PanelSeven from "./components/PanelSeven.vue";
import PanelEight from "./components/PanelEight.vue";
import PanelNine from "./components/PanelNine.vue";
import PanelTen from "./components/PanelTen.vue";
import PanelEleven from "./components/PanelEleven.vue";
import PanelTwelve from "./components/PanelTwelve.vue";
import PanelThirteen from "./components/PanelThirteen.vue";

onBeforeMount(() => {
    console.log("On Before Mount")
})

export default {
  name: "App",
  components: {
    PanelOne,
    PanelTwo,
    PanelThree,
    PanelFour,
    PanelFive,
    PanelSix,
    PanelSeven,
    PanelEight,
    PanelNine,
    PanelTen,
    PanelEleven,
    PanelTwelve,
    PanelThirteen,
  },
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

<style>
:root {
  --text-color: #111;
  --bg-color: #b9b3a9;
}

body {
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
</style>