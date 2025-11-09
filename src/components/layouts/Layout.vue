<script setup lang="ts">

</script>

<template>
  <header class="head">
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
    <a class="git" href="https://github.com/DavidJulianK" target="_blank">
      <img class="git" src="../../../public/gitdavid.jpeg" alt="pfp">
      <p>Daniel Porath</p>
      <i class="fa-brands fa-github"></i>
    </a>
  </footer>

  <footer class="htw">
    <small class="htw">Projektarbeit an der</small>
    <a href="https://www.htw-berlin.de/" target="_blank">
      <img src="../../../public/htw.jpg" alt="HTW Berlin Logo">
    </a>
  </footer>
</template>

<style scoped>
header, footer, main {
  padding: 1rem;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

main {
  flex: 1;
  display: block; /* Ändere von flex zu block */
  min-height: calc(100vh - 120px); /* Statt fester height */
  padding-top: 2rem;
  padding-bottom: 2rem;
}

header.head {
  position: fixed;
  top: 0px;
  left: 10px;
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
