<script setup lang="ts">
import { computed, reactive, ref, watchEffect } from 'vue'
import { DateTime, Settings } from 'luxon'
import { useStocksStore } from '~/store/stocks.js'

const router = useRouter()
const { t } = useI18n()
interface queryType {
  pageSize: number
  pageNumber: number
  startDate?: string | null // ISO type
  endDate?: string | null // ISO type
}
const stocks = useStocksStore()
const stockList = computed(() => {
  let stockItems: any[] = stocks.stocks

  if (stockItems) {
    stockItems = stockItems.map((obj) => {
      return { ...obj, nav_date: DateTime.fromISO(obj.nav_date).toFormat('LLL dd, yyyy, h:mm a') }
    })
  }

  return stockItems
})

const totalStock = computed(() => stocks.total)
const headers = ref<any[]>([
  { label: 'ID', value: 'mstar_id' },
  { label: 'Name', value: 'thailand_fund_code' },
  { label: 'Rank of fund', value: 'nav_return' },
  { label: 'Price', value: 'nav' },
  { label: 'Performance', value: 'avg_return' },
  { label: 'Updated date', value: 'nav_date' },
])
const query = reactive<queryType>({
  pageSize: 20,
  pageNumber: 1,
  startDate: DateTime.now().plus({ years: -2 }).startOf('day').toISO(),
  endDate: DateTime.now().startOf('day').toISO(),
})
const fetchStocks = async () => await stocks.fetchStocks(query)
const paginate = (page: number) => query.pageNumber = page
watchEffect(() => {
  if (query)
    fetchStocks()
}, { deep: true })
</script>

<template>
  <div>
    <h5
      class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
    >
      Stock Market
    </h5>
    <div
      class="max-w-full px-8 py-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
    >
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div class="flex items-center justify-between pb-4">
          <div>
            <div class="dropdown dropdown-top dropdown-end">
              <label tabindex="0" class="btn m-1">Click</label>
              <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Item 1</a></li>
                <li><a>Item 2</a></li>
              </ul>
            </div>
          </div>
          <label for="table-search" class="sr-only">Search</label>
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
            >
              <svg
                class="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <input
              id="table-search"
              type="text"
              class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for items"
            >
          </div>
        </div>

        <TheTables :headers="headers" :items="stockList" :size="query.pageSize" :total="totalStock" :page="query.pageNumber" @pagination="paginate" />
      </div>
    </div>

    <button btn m="3 t6" text-md @click="fetchStocks">
      Fetch User Click !
    </button>

    <div>
      <button btn m="3 t6" text-sm @click="router.back()">
        {{ t("button.back") }}
      </button>
    </div>
  </div>
</template>
