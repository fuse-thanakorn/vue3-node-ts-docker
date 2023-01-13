<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
  items: array
  headers: array
}>()
const valueKey: string[] = props.headers.map((e: { value: any }) => e.value)
</script>

<template>
  <table class="w-full table-compact text-sm text-left text-gray-500 dark:text-gray-400">
    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th v-for="(item, index) in props.headers" :key="index" scope="col" class="p-4">
          {{ item.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in props.items" :key="index" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td v-for="(v, i) in valueKey " :key="i" class="px-6 py-4">
          {{ item[v] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

