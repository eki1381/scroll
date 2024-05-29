<template>
  <div data-scroll class="panel">
    <div class="subtitle" style="text-align: center; padding-left: 10px; padding-right: 10px; margin-bottom: 10px;">
      Migrasi menjadi harapan bagi pembangunan berkelanjutan Indonesia. Migrasi
      dapat menumbuhkan perekonomian dan meningkatkan kualitas hidup. Tetapi,
      ada beban yang ditanggung daerah tujuan migrasi.
    </div>
    <div class="title" style="text-align: center; padding-left: 10px; padding-right: 10px; margin-top: 10px;">
      Alangkah baiknya persiapkan modal pengetahuan dan kepastian kerja ketika
      ingin bermigrasi seperti mas Bejo ya Meaning Makers!
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
  position: relative;
  display: flex;
  flex-direction: column;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
  padding: 0px 10vw;
  margin: auto;
  justify-content: center;
}

.text1 {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.text2 {
  display: flex;
  justify-content: end;
  margin-top: 20px;
}

.image {
  widows: 100vw;
  display: flex;
  justify-content: start;
  align-items: center;
}

.title {
  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  font-size: 28pt;
  font-weight: bold;
  text-align: right;
}

.subtitle {
  font-family: "Montserrat", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  font-size: 28pt;
  text-align: justify;
}
</style>