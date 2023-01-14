<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps<{
  items: any[]
  headers: any[]
  page: number
  size?: number
}>()

// type-based
const emit = defineEmits<{
  [x: string]: any
  (e: 'pagination', page: number): void
}>()
const valueKey: string[] = props.headers.map((e: { value: any }) => e.value)
const page = ref<string | number>(props.page)
// eslint-disable-next-line max-statements-per-line
const previous = () => { emit.pagination(1) }
const next = () => console.log('next')
const paginate = (page: number) => console.log(page)
</script>

<template>
  <div>
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

    <nav class="flex items-center justify-between pt-4" aria-label="Table navigation">
      <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Showing <span class="font-semibold text-gray-900 dark:text-white">1-10</span> of <span class="font-semibold text-gray-900 dark:text-white">1000</span></span>

      <ul class="inline-flex items-center -space-x-px">
        <li>
          <a class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" @click="previous">
            <span class="sr-only">Previous</span>
            <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
          </a>
        </li>
        <li v-for="(item, index) in props.items" :key="index">
          <a v-if="page === index + 1" class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-500 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" @click="paginate(index + 1)">{{ index + 1 }}</a>
          <a v-else class="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" @click="paginate(index + 1)">{{ index + 1 }}</a>
        </li>

        <li>
          <a class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" @click="next">
            <span class="sr-only">Next</span>
            <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" /></svg>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

