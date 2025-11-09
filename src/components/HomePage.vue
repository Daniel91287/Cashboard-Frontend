<script setup lang="ts">
const emit = defineEmits(["navigate"]);
</script>

<template>
  <small @click="emit('navigate', 1)">Zurück [Du bist auf der HomePage]</small>
</template>

<style scoped>

</style>
