<script setup>
import { computed, ref } from 'vue'

const userItems = [
  { id: 1, name: 'Shoes 1' },
  { id: 2, name: 'Shoes 2' },
  { id: 3, name: 'Shoes 3' },
  { id: 4, name: 'Shoes 4' },
  { id: 5, name: 'T-shirt 1' },
  { id: 6, name: 'T-shirt 2' },
  { id: 7, name: 'T-shirt 3' },
  { id: 8, name: 'T-shirt 4' }
]

const availableItems = [
  { id: 11, name: 'Jacket 1' },
  { id: 12, name: 'Jacket 2' },
  { id: 13, name: 'Jacket 3' },
  { id: 14, name: 'Jacket 4' },
  { id: 15, name: 'Hoodie 1' },
  { id: 16, name: 'Hoodie 2' },
  { id: 17, name: 'Hoodie 3' },
  { id: 18, name: 'Hoodie 4' }
]

const selectedUserIds = ref([userItems[0].id])
const selectedAvailableId = ref(null)

const selectedUserItems = computed(() =>
  selectedUserIds.value
    .map((id) => userItems.find((item) => item.id === id))
    .filter(Boolean)
)

const selectedAvailableItem = computed(() =>
  availableItems.find((item) => item.id === selectedAvailableId.value) || null
)

const selectedUserCount = computed(() => selectedUserIds.value.length)

const isUserSelected = (id) => selectedUserIds.value.includes(id)
const isAvailableSelected = (id) => selectedAvailableId.value === id

const toggleUserItem = (item) => {
  const ids = selectedUserIds.value
  const index = ids.indexOf(item.id)

  if (index !== -1) {
    if (ids.length === 1) return
    selectedUserIds.value = ids.filter((id) => id !== item.id)
    return
  }

  if (ids.length >= 6) return
  selectedUserIds.value = [...ids, item.id]
}

const selectAvailableItem = (item) => {
  selectedAvailableId.value = item.id
}

const clearAvailableSelection = () => {
  selectedAvailableId.value = null
}
</script>

<template>
  <main class="page">
    <section class="grid">
      <section class="panel panel--top">
        <div class="panel__header">Selected items</div>
        <div class="panel__content items-grid">
          <div v-for="item in selectedUserItems" :key="item.id" class="item-card item-card--selected">
            <span class="item-label">{{ item.name }}</span>
            <button
              type="button"
              class="item-remove"
              :disabled="selectedUserCount === 1"
              :aria-label="`Remove ${item.name}`"
              @click="toggleUserItem(item)"
            >
              x
            </button>
          </div>
        </div>
        <div class="panel__meta">Selected: {{ selectedUserCount }} / 6</div>
      </section>

      <section class="panel panel--top">
        <div class="panel__header">Selected item</div>
        <div class="panel__content items-grid items-grid--single">
          <div v-if="selectedAvailableItem" class="item-card item-card--selected">
            <span class="item-label">{{ selectedAvailableItem.name }}</span>
            <button
              type="button"
              class="item-remove"
              :aria-label="`Remove ${selectedAvailableItem.name}`"
              @click="clearAvailableSelection"
            >
              x
            </button>
          </div>
          <div v-else class="item-card item-card--empty">No selection</div>
        </div>
      </section>

      <section class="panel panel--bottom">
        <div class="panel__header">Your items</div>
        <div class="panel__content items-grid">
          <button
            v-for="item in userItems"
            :key="item.id"
            type="button"
            class="item-button"
            :class="{ 'is-selected': isUserSelected(item.id) }"
            :disabled="selectedUserCount >= 6 && !isUserSelected(item.id)"
            :aria-pressed="isUserSelected(item.id)"
            @click="toggleUserItem(item)"
          >
            {{ item.name }}
          </button>
        </div>
      </section>

      <section class="panel panel--bottom">
        <div class="panel__header">Available items</div>
        <div class="panel__content items-grid">
          <button
            v-for="item in availableItems"
            :key="item.id"
            type="button"
            class="item-button"
            :class="{ 'is-selected': isAvailableSelected(item.id) }"
            :aria-pressed="isAvailableSelected(item.id)"
            @click="selectAvailableItem(item)"
          >
            {{ item.name }}
          </button>
        </div>
      </section>
    </section>
  </main>
</template>
