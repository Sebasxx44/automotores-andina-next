<template>
  <section class="community-section container section" aria-labelledby="community-title">
    <div class="section-heading">
      <div>
        <p class="eyebrow">HISTORIAS REALES</p>
        <h2 id="community-title">El mejor destino.<br /><span class="muted">Una nueva historia.</span></h2>
      </div>
      <p class="gallery-hint"><MoveHorizontal :size="16" :stroke-width="1.3" aria-hidden="true" /> Desliza para descubrir más historias</p>
    </div>

    <div class="delivery-gallery" tabindex="0" role="region" aria-label="Galería de entregas de vehículos. Desliza o usa las flechas del teclado para explorar.">
      <figure v-for="(photo, index) in siteContent.deliveries" :key="photo" class="delivery-photo">
        <img :src="photo" :alt="`Entrega de vehículo en Automotores Andina, fotografía ${index + 1}`" width="960" height="720" loading="lazy" decoding="async" />
        <figcaption><span class="delivery-number">{{ String(index + 1).padStart(2, '0') }}</span>Una nueva historia en Andina</figcaption>
      </figure>
    </div>

    <div class="community-reviews">
      <figure v-for="testimonial in testimonials" :key="testimonial.name" class="testimonial">
        <Quote :size="22" :stroke-width="1.2" aria-hidden="true" />
        <blockquote>{{ testimonial.quote }}</blockquote>
        <figcaption>{{ testimonial.name }}</figcaption>
      </figure>
    </div>

    <div class="reviews-source">
      <p class="reviews-rating"><Star :size="14" :stroke-width="1.3" aria-hidden="true" /><span>{{ siteContent.reviewRating }}<span class="muted"> / 5</span></span><span class="reviews-divider" aria-hidden="true">·</span><span class="muted">{{ siteContent.reviewCount }} reseñas</span></p>
      <p>Reseñas publicadas en el sitio original</p>
    </div>
  </section>
</template>

<script setup lang="ts">
// IMPORTS
import { MoveHorizontal, Quote, Star } from '@lucide/vue';
import siteContent from '@/data/site-content.json';

// PROPS/CONSTANTS/ROUTE/RUNTIME CONFIG
const testimonials = [
  {
    name: 'Carolina Marín Restrepo',
    quote: 'Excelente experiencia. La empresa es 💯% confiable, empática con sus clientes y se esmeran porque recibamos una muy buena calidad en el vehículo usado que estamos adquiriendo…',
  },
  {
    name: 'Valentina Loaiza',
    quote: 'Tuve una excelente experiencia con la empresa. Desde el inicio sentí mucha confianza por el respaldo y reconocimiento que tienen como marca. La venta de mi propiedad fue muy rápida…',
  },
  {
    name: 'Kelly Tatiana',
    quote: 'Cordial saludo, Los mejores indudablemente. Gracias al acompañamiento del Asesor Mauricio que me acompañó en todo el proceso e hizo posible cumplir mi sueño. Gracias siempre Automotores Andina.',
  },
];

// STATE (refs/reactive)
// COMPOSABLES(useX)
// STORE
// COMPUTED
// FUNCTIONS
// WATCHERS
// LIFECYCLE
</script>

<style scoped>
.community-section { overflow: hidden; }
.section-heading .gallery-hint { display: flex; align-items: center; gap: 10px; font-size: 11px; white-space: nowrap; }
.gallery-hint svg { flex-shrink: 0; }
.delivery-gallery { display: grid; grid-auto-flow: column; grid-auto-columns: calc((100% - 44px) / 3); gap: 22px; overflow-x: auto; scroll-snap-type: x mandatory; overscroll-behavior-inline: contain; padding-bottom: 24px; scrollbar-width: thin; scrollbar-color: #414146 transparent; }
.delivery-gallery::-webkit-scrollbar { height: 4px; }
.delivery-gallery::-webkit-scrollbar-track { background: transparent; }
.delivery-gallery::-webkit-scrollbar-thumb { background: #414146; border-radius: 999px; }
.delivery-gallery:focus-visible { outline: 2px solid var(--color-electric-link); outline-offset: -2px; border-radius: 28px 28px 4px 4px; }
.delivery-photo { margin: 0; min-width: 0; scroll-snap-align: start; }
.delivery-photo img { width: 100%; height: auto; aspect-ratio: 4 / 3; object-fit: cover; border-radius: 28px; background: var(--color-graphite); }
.delivery-photo figcaption { display: flex; align-items: center; gap: 13px; padding: 19px 4px 0; font-size: 11px; color: #b4b4bc; line-height: 1.6; }
.delivery-number { color: var(--color-ash); font-size: 9px; font-variant-numeric: tabular-nums; letter-spacing: 1px; }
.community-reviews { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 42px; margin-top: 62px; }
.testimonial { display: flex; flex-direction: column; margin: 0; min-width: 0; padding: 0 10px; }
.testimonial > svg { color: #85858e; margin-bottom: 22px; }
.testimonial blockquote { margin: 0 0 24px; font-size: 13px; color: #bdbdc5; line-height: 1.9; }
.testimonial figcaption { margin-top: auto; font-size: 11px; color: var(--color-porcelain); }
.reviews-source { display: flex; align-items: center; justify-content: space-between; gap: 18px; border-top: 1px solid var(--border); padding-top: 25px; margin-top: 48px; }
.reviews-rating { display: flex; align-items: center; gap: 9px; font-size: 12px; }
.reviews-rating > svg { color: #c4c4ca; }
.reviews-divider { padding-inline: 6px; color: #62626a; }
.reviews-source > p:last-child { font-size: 10px; color: var(--color-ash); }

@media (max-width: 1000px) {
  .delivery-gallery { grid-auto-columns: calc((100% - 22px) / 2); }
  .community-reviews { gap: 24px; }
  .testimonial { padding-inline: 0; }
}

@media (max-width: 760px) {
  .section-heading .gallery-hint { font-size: 10px; }
  .delivery-gallery { grid-auto-columns: 100%; gap: 16px; padding-bottom: 20px; }
  .delivery-photo figcaption { font-size: 11px; }
  .community-reviews { grid-template-columns: 1fr; gap: 30px; margin-top: 38px; }
  .testimonial { padding: 0 2px 28px; border-bottom: 1px solid var(--border); }
  .testimonial:last-child { padding-bottom: 0; border-bottom: 0; }
  .testimonial > svg { margin-bottom: 14px; }
  .testimonial blockquote { font-size: 13px; margin-bottom: 17px; }
  .reviews-source { flex-direction: column; align-items: flex-start; gap: 14px; margin-top: 34px; }
}
</style>
