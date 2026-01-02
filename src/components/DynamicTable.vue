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
  <div>
    <table>
      <thead>
      <tr>
        <th>Umsatzübersicht</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th>Nr.</th>
        <th>Bezeichnung</th>
        <th>Betrag in EUR </th>
        <th>Datum</th>
      </tr>
      <tr v-for="(eintrag, index) in props.items" :key="eintrag.id">
        <th>{{ index + 1 }}</th>
        <td>{{ eintrag.description}}</td>
        <td>{{ eintrag.amount }}</td>
        <td>{{ eintrag.date }}</td>
        <div class="deleteButton" @click="deleteTransaction(eintrag.id)">
          <div class="icon-wrappter">
            <Trash class="icon" />
          </div>
        </div>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.deleteButton {
  display: flex;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  gap: 14px;
  padding: 14px;
  border-radius: 12px;
  background: hsla(207, 54%, 51%, 0.2);
  border: 1px solid hsla(207, 54%, 51%, 0.15);
  box-shadow: 1px 3px 4px hsla(0,0%,0%,0.2);
  transition: all 0.5s ease;
}

.deleteButton:hover {
  text-decoration: underline;
  cursor: pointer;
  border-color: transparent;
  background: hsla(207, 54%, 51%, 0.25);
}
</style>
