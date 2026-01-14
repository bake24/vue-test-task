<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true
  },
  selected: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['select'])
</script>

<template>
  <button
    type="button"
    class="item-button"
    :class="{ 'is-selected': props.selected }"
    :disabled="props.disabled"
    :aria-pressed="props.selected"
    @click="$emit('select')"
  >
    {{ props.label }}
  </button>
</template>
