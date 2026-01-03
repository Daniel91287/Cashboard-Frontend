<script setup lang="ts">
import {ref, Ref, defineProps} from 'vue'
import type {Transaction} from "@/types.ts";
import {Trash} from "lucide-vue-next";

const props = defineProps<{
  items: Transaction[]
  deleteTransaction: (id: number) => Promise<void>
}>()


</script>

<template>
  <div></div>
</template>

<style scoped>

</style>
