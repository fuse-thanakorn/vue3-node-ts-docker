<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})
const user = useUserStore()
const name = $ref(user.savedName)

const router = useRouter()
const go = (to) => {
  if (to) {
    if (name && to === 'name')
      router.push(`/hi/${encodeURIComponent(name)}`)
    if (to === 'stock')
      router.push('/stock/list')
  }
}

const { t } = useI18n()
</script>

<template>
  <div>
    <div text-4xl>
      <div i-carbon-campsite inline-block />
    </div>
    <p>
      <a
        rel="noreferrer"
        href="https://github.com/antfu/vitesse"
        target="_blank"
      >
        Slowhand Basic lab
      </a>
    </p>
    <p>
      <em text-sm opacity-75>{{ t("intro.desc") }}</em>
    </p>

    <div py-4 />

    <TheInput
      v-model="name"
      placeholder="What's your name?"
      autocomplete="false"
      @keydown.enter="go('name')"
    />
    <label class="hidden" for="input">{{ t("intro.whats-your-name") }}</label>

    <div>
      <button btn m-3 text-sm :disabled="!name" @click="go('name')">
        {{ t("button.go") }}
      </button>
    </div>
    <div>
      <button btn m-3 text-sm :disabled="!name" @click="go('stock')">
        Stock
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
