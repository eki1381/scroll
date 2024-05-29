<template >
  <div class="panel">
    <div data-scroll data-scroll-speed="-2" class="center">
      <v-img
        class="writer"
        :width="'30vw'"
        :height="'auto'"
        src="https://raw.githubusercontent.com/eki1381/Storytelling/main/section2_writer.png"
      ></v-img>
      <v-img
        class="quote"
        :width="'60vw'"
        :height="'auto'"
        src="https://raw.githubusercontent.com/eki1381/Storytelling/main/section2_quote.png"
      ></v-img>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";

export default {
  methods: {
    initiatePanel() {
      gsap.fromTo(
        ".center",
        { opacity: "0" },
        { opacity: "100", duration: 10, ease: "power2.in" }
      );
    },
  },
  mounted() {
    this.initiatePanel();
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

.writer {
  position: absolute;
  width: 30vw;
  top: 57%;
}

.quote {
  position: absolute;
  width: 50vw;
  top: 20%;
}

.center {
  position: relative;
  display: flex;
  justify-content: center;
  text-align: center;
  width: 100vw;
  height: 100vh;
}
</style>