<script setup lang="ts">
</script>

<template>
  <div>
    <header class="head">
      <img class="logo" src="/Logo.png" alt="">
      <h1>Cashboard</h1>
    </header>

    <main>
      <slot />
    </main>

    <footer class="git">
      <small>Created by</small>
      <a class="git" href="https://github.com/DavidJulianK" target="_blank">
        <img class="git" src="/gitdavid.jpeg" alt="pfp">
        <p>David Julian Kiedacz</p>
        <i class="fa-brands fa-github"></i>
      </a>
      <a class="git" href="https://github.com/Daniel91287" target="_blank">
        <img class="git" src="/gitdaniel.jpg" alt="pfp">
        <p>Daniel Porath</p>
        <i class="fa-brands fa-github"></i>
      </a>
    </footer>

    <footer class="htw">
      <small class="htw">Projektarbeit an der</small>
      <a href="https://www.htw-berlin.de/" target="_blank">
        <img src="/htw.png" alt="HTW Berlin Logo">
      </a>
    </footer>
  </div>
</template>

<style>
html, body {
  height: 100vh;
  width: 100%;

  background-image:
    url('/hintergrund.jng');

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-blend-mode: multiply;
}


/* MAIN bleibt ein flexibler Container */
main {
  padding: 1rem;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;

  min-height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Header */
header.head {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  z-index: 250;
  font-size: 1.1rem;
  color: black;
}

.logo {
  max-height: 30px;
  width: auto;
  display: block;
}

/* Footer Git */
footer.git {
  position: fixed;
  bottom: 5px;
  left: 5px;
  padding: 1.5rem;
  text-align: left;
  width: fit-content;
}

/* Git Profile Links */
footer a.git {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.2rem;
  padding-right: 0.5rem;
  border-radius: 2rem;
  transition: box-shadow 0.2s;
}

footer a img.git {
  max-height: 30px;
  aspect-ratio: 1 / 1;
  border-radius: 100%;
}

/* Footer HTW */
footer.htw {
  position: fixed;
  bottom: 5px;
  right: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
}

footer.htw img {
  max-height: 50px;
  display: block;
}

small.htw {
  position: absolute;
  bottom: 65px;
  right: 28px;
}
</style>
