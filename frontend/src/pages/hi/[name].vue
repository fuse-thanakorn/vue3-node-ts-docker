<script setup lang="ts">
import { useCounterStore } from '~/store/rand'
import { useUsersStore } from '~/store/users'

const props = defineProps<{ name: string }>()
const router = useRouter()
const user = useUserStore()
const { t } = useI18n()

const counter = useCounterStore()
const users = useUsersStore()

const onCounterClick = () => counter.increment()
const onUsersClick = async () => await users.fetchUsers()

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
      ------------
    </p>
    <h2 v-if="users.users">
      Here The Result  :
    </h2>
    <span>
      {{ users.users }}
    </span>
    <button
      btn m="3 t6" text-md
      @click="onUsersClick"
    >
      Fetch User Click !
    </button>
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
