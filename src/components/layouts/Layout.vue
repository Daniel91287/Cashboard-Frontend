<script setup lang="ts">

</script>

<template>
  <header class="head">
    <img class="logo" src="../../../public/Logo.png" alt="">
    <h1>Cashboard</h1>
  </header>
  <main>
    <slot/>
  </main>
  <footer class="git">
    <small>Created by</small>
    <a class="git" href="https://github.com/DavidJulianK" target="_blank">
      <img class="git" src="../../../public/gitdavid.jpeg" alt="pfp">
      <p>David Julian Kiedacz</p>
      <i class="fa-brands fa-github"></i>
    </a>
    <a class="git" href="https://github.com/Daniel91287" target="_blank">
      <img class="git" src="../../../public/gitdaniel.jpg" high="150" alt="pfp">
      <p>Daniel Porath</p>
      <i class="fa-brands fa-github"></i>
    </a>
  </footer>

  <footer class="htw">
    <small class="htw">Projektarbeit an der</small>
    <a href="https://www.htw-berlin.de/" target="_blank">
      <img src="../../../public/htw.png" alt="HTW Berlin Logo">
    </a>
  </footer>
</template>

<style scoped>
main {
  /* Breite: zentrierter Container */
  padding: 1rem;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;

  /* Zentrierung: Flex-Container */
  min-height: calc(100vh - 120px); /* etwas Platz für Header/Footer */
  display: flex;
  flex-direction: column;
  justify-content: center;  /* vertikal in der Mitte */
  align-items: center;      /* horizontal in der Mitte */
}


header.head {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  z-index: 250;
}

.logo {
  max-height: 30px;
  width: auto; /* Proportionen beibehalten */
  display: block;
}

footer.git {
  position: fixed;
  bottom: 5px;
  left: 5px;
  display: block;
  padding: 1.5rem;
  text-align: left;
  width: fit-content;
}

footer a.git {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  padding: 0.2rem;
  padding-right: 0.5rem;
  border: 1px solid transparent;
  border-radius: 2rem;
  transition: box-shadow 0.2s;
  text-decoration: none;
}

footer a img.git {
  max-height: 30px;
  aspect-ratio: 1 / 1;
  border-radius: 100%;
}

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

small.htw{
  position: absolute;
  bottom: 65px;
  right: 28px;
}
</style>
