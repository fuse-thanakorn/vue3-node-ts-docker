<script setup lang="ts">
import { useStocksStore } from '~/store/stocks.js'

const props = defineProps<{ name: string }>()
const router = useRouter()
const { t } = useI18n()

const stocks = useStocksStore()

const onStocksClick = async () => await stocks.fetchStocks()

watchEffect(() => {

})
</script>

<template>
  <div>
    <h2 v-if="stocks.stocks">
      Here The Result  :
    </h2>
    <table class="table-auto">
      <thead>
        <tr>
          <th>Song</th>
          <th>Artist</th>
          <th>Year</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
          <td>Malcolm Lockyer</td>
          <td>1961</td>
        </tr>
        <tr>
          <td>Witchy Woman</td>
          <td>The Eagles</td>
          <td>1972</td>
        </tr>
        <tr>
          <td>Shining Star</td>
          <td>Earth, Wind, and Fire</td>
          <td>1975</td>
        </tr>
      </tbody>
    </table>
    <button
      btn m="3 t6" text-md
      @click="onStocksClick"
    >
      Fetch User Click !
    </button>

    <div>
      <button
        btn m="3 t6" text-sm
        @click="router.back()"
      >
        {{ t('button.back') }}
      </button>
    </div>
  </div>
</template>
