<script setup lang="ts">
import {watch} from "vue";
import {useAuth0} from "@auth0/auth0-vue";
import {useRouter} from "vue-router";

const {loginWithRedirect} = useAuth0()
const {isAuthenticated, isLoading, logout} = useAuth0()
const router = useRouter()

watch(
  () => [isAuthenticated.value, isLoading.value],
  ([loggedIn, loading]) => {
    if (!loading && loggedIn) {
      router.replace('/home')
    }
  }
)

function handleLogout() {
  logout({
    logoutParams: {
      returnTo: window.location.origin
    }
  })
}

</script>

<template>
  <header>
    <nav>
      <div class="logo"><img class="logop" src="/Logo.png" alt="">Cashboard</div>
      <div class="btns">
        <button v-if="!isAuthenticated" class="btn" @click="loginWithRedirect()"><p>Login</p>
        </button>
        <button v-if="isAuthenticated" class="btn" @click="handleLogout()"><p>Logout</p></button>
      </div>
    </nav>
  </header>

  <main>
    <slot/>
  </main>

  <footer>
    <div class="git">
      <small class="text">Created by</small>
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
    </div>

    <div class="htw">
      <small class="text">Projektarbeit an der</small>
      <a href="https://www.htw-berlin.de/" target="_blank">
        <img src="/htw.png" alt="HTW Berlin Logo">
      </a>
    </div>
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

footer {
  bottom: 0;
  width: 100%;
  height: 2em;
  padding: 3rem 2%;
  background: rgba(255, 255, 255, 0.00);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
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

  background-image: url('/hintergrund.jpg');

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-color: #020d0f;
}


/* MAIN bleibt ein flexibler Container */
main {
  width: 100%;
  max-width: 90%;
  margin: 0 auto;
  flex-direction: column;
  min-height: 75vh;
}

/* Header */
.logop {
  max-height: 30px;
  filter: invert(1);
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

.htw img {
  max-height: 50px;
  display: block;
}

.text {
  color: white;
}
</style>
