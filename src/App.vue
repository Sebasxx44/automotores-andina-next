<template>
  <a class="skip-link" href="#main-content">Ir al contenido</a>
  <SiteHeaderTA />
  <main id="main-content" :ref="elements.root" tabindex="-1"><RouterView v-slot="{ Component, route }"><Transition name="route"><component :is="Component" :key="route.path" /></Transition></RouterView></main>
  <SiteFooterTA />
</template>

<script setup lang="ts">
// IMPORTS
import SiteHeaderTA from '@/components/SiteHeaderTA.vue';
import SiteFooterTA from '@/components/SiteFooterTA.vue';
import { usePageMotion } from '@/composables/page-motion/usePageMotion';
// PROPS/CONSTANTS/ROUTE/RUNTIME CONFIG
// STATE (refs/reactive)
// COMPOSABLES(useX)
const { elements } = usePageMotion();
// STORE
// COMPUTED
// FUNCTIONS
// WATCHERS
// LIFECYCLE
</script>
