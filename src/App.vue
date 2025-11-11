<script setup lang="ts">
import Layout from './components/layouts/Layout.vue'
import LandingPage from "@/components/LandingPage.vue";
import RegisterPage from "@/components/RegisterPage.vue";
import PasswortPage from "@/components/PasswortPage.vue";
import HomePage from "@/components/HomePage.vue";

import { ref } from "vue";
const selectedDisplay = ref(1); //* Ändern und aussteuern über Router */
</script>

<template>
  <Layout>
    <!-- Startseite -->
      <LandingPage v-if="selectedDisplay === 1"
                   @navigate="selectedDisplay = $event"/>
    <!-- Registrieren Seite -->
      <RegisterPage v-if="selectedDisplay === 2"
                    @navigate="selectedDisplay = $event"/>
    <!-- Passwort zurücksetzen Seite -->
      <PasswortPage v-if="selectedDisplay === 3"
                    @navigate="selectedDisplay = $event"/>
    <!-- Passwort zurücksetzen Seite -->
      <HomePage v-if="selectedDisplay === 4"
                  @navigate="selectedDisplay = $event"/>
  </Layout>
</template>

<style scoped>

</style>
