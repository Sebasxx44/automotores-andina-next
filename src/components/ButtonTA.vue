<template>
  <RouterLink v-if="to" :to="to" class="button-ta" :class="`button-ta--${variant}`"><slot /><ArrowUpRight v-if="arrow" :size="16" /></RouterLink>
  <a v-else-if="href" :href="href" class="button-ta" :class="`button-ta--${variant}`" :target="external ? '_blank' : undefined" :rel="external ? 'noopener noreferrer' : undefined"><slot /><ArrowUpRight v-if="arrow" :size="16" /></a>
  <button v-else :type="type" class="button-ta" :class="`button-ta--${variant}`" :disabled="disabled"><slot /><ArrowUpRight v-if="arrow" :size="16" /></button>
</template>

<script setup lang="ts">
// IMPORTS
import { ArrowUpRight } from '@lucide/vue';
// PROPS/CONSTANTS/ROUTE/RUNTIME CONFIG
withDefaults(defineProps<{ to?: string; href?: string; variant?: 'primary' | 'secondary' | 'ghost'; type?: 'button' | 'submit'; arrow?: boolean; external?: boolean; disabled?: boolean }>(), { variant: 'primary', type: 'button', arrow: false, external: false, disabled: false });
// STATE (refs/reactive)
// COMPOSABLES(useX)
// STORE
// COMPUTED
// FUNCTIONS
// WATCHERS
// LIFECYCLE
</script>
