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
    <span>
      {{ stocks.stocks }}
    </span>
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
