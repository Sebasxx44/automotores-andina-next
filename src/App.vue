<template>
  <a class="skip-link" href="#main-content">Ir al contenido</a>
  <SiteHeaderTA />
  <main id="main-content" tabindex="-1"><RouterView /></main>
  <SiteFooterTA />
</template>

<script setup lang="ts">
// IMPORTS
import SiteHeaderTA from '@/components/SiteHeaderTA.vue';
import SiteFooterTA from '@/components/SiteFooterTA.vue';
// PROPS/CONSTANTS/ROUTE/RUNTIME CONFIG
// STATE (refs/reactive)
// COMPOSABLES(useX)
// STORE
// COMPUTED
// FUNCTIONS
// WATCHERS
// LIFECYCLE
</script>
