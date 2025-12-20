<template>
  <button
    :class="[
      variant === 'primary' ? 'btn-primary' : 'btn-secondary'
    ]"
    :disabled="disabled"
    @click="emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
type ButtonVariant = 'primary' | 'secondary'

withDefaults(
  defineProps<{
    variant?: ButtonVariant
    disabled?: boolean
  }>(),
  {
    variant: 'primary',
    disabled: false
  }
)

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()
</script>
