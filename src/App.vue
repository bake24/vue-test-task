<script setup>
import { computed } from 'vue'
import { availableItems, userItems } from './data/items'
import { useSelection } from './composables/useSelection'
import ItemButton from './components/ItemButton.vue'
import ItemCard from './components/ItemCard.vue'
import SelectionPanel from './components/SelectionPanel.vue'

const {
  selectedUserItems,
  selectedAvailableItem,
  selectedUserCount,
  maxUser,
  isUserSelected,
  isAvailableSelected,
  toggleUserItem,
  selectAvailableItem,
  clearAvailableSelection
} = useSelection({
  userItems,
  availableItems
})

const selectedMeta = computed(() => `Selected: ${selectedUserCount.value} / ${maxUser}`)
</script>

<template>
  <main class="page">
    <section class="grid">
      <SelectionPanel title="Selected items" variant="top">
        <div class="items-grid">
          <ItemCard
            v-for="item in selectedUserItems"
            :key="item.id"
            :label="item.name"
            removable
            :remove-disabled="selectedUserCount === 1"
            @remove="toggleUserItem(item)"
          />
        </div>
        <template #meta>{{ selectedMeta }}</template>
      </SelectionPanel>

      <SelectionPanel title="Selected item" variant="top">
        <div class="items-grid items-grid--single">
          <ItemCard
            v-if="selectedAvailableItem"
            :label="selectedAvailableItem.name"
            removable
            @remove="clearAvailableSelection"
          />
          <div v-else class="item-card item-card--empty">No selection</div>
        </div>
      </SelectionPanel>

      <SelectionPanel title="Your items" variant="bottom">
        <div class="items-grid">
          <ItemButton
            v-for="item in userItems"
            :key="item.id"
            :label="item.name"
            :selected="isUserSelected(item.id)"
            :disabled="selectedUserCount >= maxUser && !isUserSelected(item.id)"
            @select="toggleUserItem(item)"
          />
        </div>
      </SelectionPanel>

      <SelectionPanel title="Available items" variant="bottom">
        <div class="items-grid">
          <ItemButton
            v-for="item in availableItems"
            :key="item.id"
            :label="item.name"
            :selected="isAvailableSelected(item.id)"
            @select="selectAvailableItem(item)"
          />
        </div>
      </SelectionPanel>
    </section>
  </main>
</template>
