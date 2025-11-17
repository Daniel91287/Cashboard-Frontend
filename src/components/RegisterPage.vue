<script setup lang="ts">
import {useRouter} from "vue-router";
const router = useRouter()
</script>

<template>
  <small @click="router.go(-1)">Zurück [Du bist bei Registrieren Page]</small>
</template>

<style scoped>

</style>
