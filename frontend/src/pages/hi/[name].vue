<script setup lang="ts">
import { useCounterStore } from '~/store/rand'

const props = defineProps<{ name: string }>()
const router = useRouter()
const user = useUserStore()
const { t } = useI18n()

const counter = useCounterStore()

const onCounterClick = () => counter.increment()

watchEffect(() => {
  user.setNewName(props.name)
})
</script>

<template>
  <div>
    <div text-4xl>
      <div i-carbon-pedestrian inline-block />
    </div>
    <p>
      {{ t('intro.hi', { name: props.name }) }}
    </p>

    <p text-sm opacity-75>
      <em>{{ counter.count }}</em>
    </p>

    <button
      btn m="3 t6" text-sm
      @click="onCounterClick"
    >
      Click Me !
    </button>
    <p>
      <template v-if="user.otherNames.length">
        <p text-sm mt-4>
          <span opacity-75>{{ t('intro.aka') }}:</span>
          <ul>
            <li v-for="otherName in user.otherNames" :key="otherName">
              <RouterLink :to="`/hi/${otherName}`" replace>
                {{ otherName }}
              </RouterLink>
            </li>
          </ul>
        </p>
      </template>
    </p><div>
      <button
        btn m="3 t6" text-sm
        @click="router.back()"
      >
        {{ t('button.back') }}
      </button>
    </div>
  </div>
</template>
