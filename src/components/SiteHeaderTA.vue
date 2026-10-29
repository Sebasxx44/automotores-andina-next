<template>
  <header class="site-header">
    <div class="container nav-inner">
      <BrandTA />
      <nav class="desktop-nav" aria-label="Navegación principal">
        <RouterLink to="/catalogo">Comprar</RouterLink><RouterLink to="/vender">Vender</RouterLink><RouterLink to="/financiar">Financiar</RouterLink><RouterLink to="/servicios">Servicios</RouterLink><RouterLink to="/nosotros">Nosotros</RouterLink>
      </nav>
      <div class="nav-actions"><RouterLink to="/catalogo?favoritos=1" class="icon-button saved-nav" aria-label="Ver vehículos guardados"><Heart :size="19" /></RouterLink><ButtonTA class="header-contact" href="https://wa.me/573026606878" external variant="secondary" arrow>Hablemos</ButtonTA><button class="icon-button mobile-toggle" :aria-expanded="navigation.menuOpen.value" aria-controls="mobile-menu" :aria-label="navigation.menuOpen.value ? 'Cerrar menú' : 'Abrir menú'" @click="navigation.toggleMenu"><X v-if="navigation.menuOpen.value" :size="24" /><Menu v-else :size="24" /></button></div>
    </div>
    <nav v-if="navigation.menuOpen.value" id="mobile-menu" class="mobile-menu" aria-label="Navegación móvil" @keydown.esc="navigation.closeMenu"><RouterLink v-for="link in links" :key="link.to" :to="link.to">{{ link.label }}<ArrowUpRight :size="22" /></RouterLink><ButtonTA href="https://wa.me/573026606878" external>Hablar con un asesor</ButtonTA><span class="muted">Pereira, Colombia</span></nav>
  </header>
</template>

<script setup lang="ts">
// IMPORTS
import { ArrowUpRight, Heart, Menu, X } from '@lucide/vue';
import BrandTA from '@/components/BrandTA.vue';
import ButtonTA from '@/components/ButtonTA.vue';
import { useNavigation } from '@/composables/useNavigation';
// PROPS/CONSTANTS/ROUTE/RUNTIME CONFIG
const links = [{ to: '/catalogo', label: 'Comprar' }, { to: '/vender', label: 'Vender' }, { to: '/financiar', label: 'Financiar' }, { to: '/servicios', label: 'Servicios' }, { to: '/nosotros', label: 'Nosotros' }];
// STATE (refs/reactive)
// COMPOSABLES(useX)
const { navigation } = useNavigation();
// STORE
// COMPUTED
// FUNCTIONS
// WATCHERS
// LIFECYCLE
</script>
