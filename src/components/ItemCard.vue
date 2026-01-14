<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  removable: {
    type: Boolean,
    default: false
  },
  removeDisabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['remove'])
</script>

<template>
  <div class="item-card" :class="{ 'item-card--selected': props.removable }">
    <span class="item-label">{{ props.label }}</span>
    <button
      v-if="props.removable"
      type="button"
      class="item-remove"
      :disabled="props.removeDisabled"
      :aria-label="`Remove ${props.label}`"
      @click="$emit('remove')"
    >
      x
    </button>
  </div>
</template>
