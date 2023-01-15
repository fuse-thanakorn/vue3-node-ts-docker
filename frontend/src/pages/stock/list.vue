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
        <div date-rangepicker class="mb-4 flex items-center">
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" /></svg>
            </div>
            <input v-model="query.startDate" name="start" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date start">
          </div>
          <span class="mx-4 text-gray-500">to</span>
          <div class="relative">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" /></svg>
            </div>
            <input v-model="query.endDate" name="end" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date end">
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
