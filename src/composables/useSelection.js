import { computed, ref } from 'vue'

export const useSelection = ({ userItems, availableItems, maxUser = 6, minUser = 1 }) => {
  const initialUserIds = userItems.slice(0, minUser).map((item) => item.id)
  const selectedUserIds = ref(initialUserIds)
  const selectedAvailableId = ref(null)

  const selectedUserItems = computed(() =>
    selectedUserIds.value
      .map((id) => userItems.find((item) => item.id === id))
      .filter(Boolean)
  )

  const selectedAvailableItem = computed(
    () => availableItems.find((item) => item.id === selectedAvailableId.value) || null
  )

  const selectedUserCount = computed(() => selectedUserIds.value.length)

  const isUserSelected = (id) => selectedUserIds.value.includes(id)
  const isAvailableSelected = (id) => selectedAvailableId.value === id

  const toggleUserItem = (item) => {
    const ids = selectedUserIds.value
    const index = ids.indexOf(item.id)

    if (index !== -1) {
      if (ids.length <= minUser) return
      selectedUserIds.value = ids.filter((id) => id !== item.id)
      return
    }

    if (ids.length >= maxUser) return
    selectedUserIds.value = [...ids, item.id]
  }

  const selectAvailableItem = (item) => {
    selectedAvailableId.value = item.id
  }

  const clearAvailableSelection = () => {
    selectedAvailableId.value = null
  }

  return {
    selectedUserItems,
    selectedAvailableItem,
    selectedUserCount,
    maxUser,
    isUserSelected,
    isAvailableSelected,
    toggleUserItem,
    selectAvailableItem,
    clearAvailableSelection
  }
}
