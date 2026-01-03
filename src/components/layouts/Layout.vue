<script setup lang="ts">
</script>

<template>
  <nav>
    <div class="logo"><img class="logop" src="/Logo.png" alt="">Cashboard</div>
    <div class="btns">
      <button class="btn">Login</button>
    </div>
  </nav>

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
</template>

<style>
nav {
  width: 100%;
  padding: 1rem 2%;
  background: rgba(255, 255, 255, 0.00);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(15px);
  margin-bottom: 1em;

  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 2rem;
  font-weight: 500;
  letter-spacing: 1px;
  color: white;
}

.nav-links li a {
  position: relative;
  font-size: 1.05rem;
  font-weight: 500;
  text-decoration: none;
  color: white;
}

.nav-links li a:hover {
  color: white;
  text-shadow: 0 0 1px white;
}

.btns {
  display: flex;
}

.btn {
  padding: 0.7rem 2.5rem;
  border-radius: 24px;
  font-weight: 600;
  font-size: 1rem;
  background: #1D4975;
  color: white;
  box-shadow: 0 0 8px #1D4975;
  border: none;
  cursor: pointer;
  transition: 0.3s;
}


html, body {
  height: 100vh;
  width: 100%;

  background-image:
    url('/hintergrund.jpg');

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #020d0f;
}


/* MAIN bleibt ein flexibler Container */
main {
  padding-top: 5rem;
  padding-bottom: 7rem;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Header */
.logop {
  max-height: 30px;
  filter: invert(1);
}

/* Footer Git */
footer.git {
  position: fixed;
  bottom: 5px;
  left: 5px;
  padding: 1.5rem;
  text-align: left;
  width: fit-content;
  color: white;
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
  color: white;
}
</style>
