<script setup lang="ts">
import Layout from './components/layouts/Layout.vue'
const selectedDisplay: number = 1;
</script>

<template>
  <Layout>
    <!-- Startseite -->
      <LandingPage v-if="selectedDisplay === 1" />
    <!-- Login Seite -->
      <LoginPagev v-if="selectedDisplay === 2" />
    <!-- Registrierung Seite -->
      <RegisterPage v-if="selectedDisplay === 3"/>
  </Layout>
</template>

<style scoped>

</style>
