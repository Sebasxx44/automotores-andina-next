<template>
  <header class="action-header" :class="{ 'action-header--compact': compact }">
    <div><p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p><h1>{{ title }}</h1><p v-if="description" class="action-header__description">{{ description }}</p><slot /></div>
    <div v-if="$slots.actions" class="action-header__actions"><slot name="actions" /></div>
  </header>
</template>

<script setup lang="ts">
// IMPORTS
// PROPS/CONSTANTS/ROUTE/RUNTIME CONFIG
withDefaults(defineProps<{ eyebrow?: string; title: string; description?: string; compact?: boolean }>(), { compact: false });
// STATE (refs/reactive)
// COMPOSABLES(useX)
// STORE
// COMPUTED
// FUNCTIONS
// WATCHERS
// LIFECYCLE
</script>
