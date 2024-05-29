<template>
  <div data-scroll class="panel">
    <div class="center">
      <div class="text">
        <div class="title">Lalu, bagaimana pola migrasi saat ini?</div>
        <div class="subtitle">
          Migrasi didominasi oleh usia produktif. Keputusan mereka pindah
          didorong oleh faktor ekonomi. Terkadang konflik politik dan bencana
          alam juga menjadi pendorong mereka bermigrasi.
        </div>
      </div>
      <div>
        <v-img
          class="slide1"
          :width="'100%'"
          :height="'auto'"
          src="https://raw.githubusercontent.com/eki1381/Storytelling/main/section6_slide1.png"
        ></v-img>
      </div>
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
    display: flex;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 2rem;
    padding: 50px 10vw;
    margin: auto;
    align-items: flex-start;
  }
  
  .text {
    display: flex;
    flex-direction: column;
    justify-content: start;
    text-align: left;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  
  .center {
    flex-direction: column;
    position: relative;
    display: flex;
    text-align: center;
    width: 100vw;
    height: 100vh;
  }
  
  .title {
    font-family: "Montserrat", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
    font-size: 32pt;
    font-weight: bold;
  }
  
  .subtitle {
    font-family: "Montserrat", sans-serif;
    font-optical-sizing: auto;
    font-style: normal;
    font-size: 20pt;
  }
</style>