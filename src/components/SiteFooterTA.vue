<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-top"><div><BrandTA /><p>Tu próximo destino<br />empieza con una buena decisión.</p></div><div class="footer-call"><span class="eyebrow">CONVERSEMOS</span><a href="tel:+573148816462">314 881 6462 <ArrowUpRight :size="27" /></a><a href="mailto:infoautomotoresandina@gmail.com" class="muted">infoautomotoresandina@gmail.com</a></div></div>
      <div class="footer-grid"><div><span class="footer-label">Explora</span><RouterLink to="/catalogo">Comprar un vehículo</RouterLink><RouterLink to="/vender">Vender mi vehículo</RouterLink><RouterLink to="/financiar">Financiación</RouterLink></div><div><span class="footer-label">Somos Andina</span><RouterLink to="/nosotros">Nuestra historia</RouterLink><RouterLink to="/servicios">Servicios</RouterLink><RouterLink to="/preguntas">Preguntas frecuentes</RouterLink></div><div><span class="footer-label">Visítanos</span><a href="https://maps.google.com/?q=Automotores+Andina+Av+Sur+23-31+Pereira" target="_blank" rel="noopener noreferrer">Av. Sur 23–31<br />Pereira, Risaralda <ArrowUpRight :size="12" /></a><RouterLink to="/nosotros#sedes">Ver todas las sedes</RouterLink></div><div><span class="footer-label">Te esperamos</span><p>Lunes a viernes · 8:00 a. m. – 6:00 p. m.</p><p>Sábados · 9:00 a. m. – 2:00 p. m.</p><span class="footer-open"><span /> Hagamos que pase.</span></div></div>
      <div class="footer-bottom"><span>© {{ year }} Automotores Andina S.A.S.</span><div><RouterLink to="/terminos_y_condiciones">Términos y condiciones</RouterLink><RouterLink to="/politica_de_privacidad">Privacidad</RouterLink><span>Diseño conceptual · <a href="https://sebaz.online" target="_blank" rel="noopener noreferrer">Sebaz ↗</a></span></div></div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// IMPORTS
import { ArrowUpRight } from '@lucide/vue';
import BrandTA from '@/components/BrandTA.vue';
// PROPS/CONSTANTS/ROUTE/RUNTIME CONFIG
const year = new Date().getFullYear();
// STATE (refs/reactive)
// COMPOSABLES(useX)
// STORE
// COMPUTED
// FUNCTIONS
// WATCHERS
// LIFECYCLE
</script>
