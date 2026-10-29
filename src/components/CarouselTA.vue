<template>
  <div class="carousel-ta" :class="{ 'carousel-ta--compact': compact }" role="region" aria-roledescription="carrusel" :aria-label="label">
    <p :id="helpId" class="carousel-ta__sr-only">Usa las flechas izquierda y derecha o desliza horizontalmente para explorar.</p>
    <div :ref="viewport.element" class="carousel-ta__viewport" tabindex="0" :aria-describedby="helpId" :aria-label="label" @keydown="interactions.keydown" @touchstart.passive="interactions.touchStart" @touchend.passive="interactions.touchEnd" @touchcancel="interactions.touchCancel" @click.capture="interactions.clickCapture">
      <div class="carousel-ta__track" :style="viewport.trackStyle.value">
        <div v-for="slide in count" :key="slide" class="carousel-ta__slide" :style="viewport.slideStyle.value" role="group" aria-roledescription="diapositiva" :aria-label="`${slide} de ${count}`" :aria-hidden="!navigation.isVisible(slide - 1)" :inert="!navigation.isVisible(slide - 1)">
          <slot name="slide" :index="slide - 1" :visible="navigation.isVisible(slide - 1)" />
        </div>
      </div>
    </div>
    <div v-if="navigation.range.value.totalPages > 1" class="carousel-ta__navigation">
      <span class="carousel-ta__position" aria-live="polite" aria-atomic="true">{{ String(navigation.range.value.firstIndex + 1).padStart(2, '0') }}—{{ String(navigation.range.value.lastIndex + 1).padStart(2, '0') }} <span>/ {{ String(count).padStart(2, '0') }}</span></span>
      <div class="carousel-ta__controls">
        <div v-if="navigation.range.value.totalPages <= 8" class="carousel-ta__pages" aria-label="Páginas del carrusel">
          <button v-for="page in navigation.range.value.totalPages" :key="page" type="button" :aria-label="`Ir a la página ${page} de ${navigation.range.value.totalPages}`" :aria-current="navigation.range.value.page === page - 1 ? 'true' : undefined" @click="navigation.goTo(page - 1)"><span /></button>
        </div>
        <button class="carousel-ta__arrow" type="button" :disabled="!navigation.canPrevious.value" aria-label="Página anterior" @click="navigation.previous"><ChevronLeft :size="18" :stroke-width="1.5" /></button>
        <button class="carousel-ta__arrow" type="button" :disabled="!navigation.canNext.value" aria-label="Página siguiente" @click="navigation.next"><ChevronRight :size="18" :stroke-width="1.5" /></button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// IMPORTS
import { useId, type VNode } from 'vue';
import { ChevronLeft, ChevronRight } from '@lucide/vue';
import { useCarousel } from '@/composables/carousel/useCarousel';

// PROPS/CONSTANTS/ROUTE/RUNTIME CONFIG
const props = withDefaults(defineProps<{ count: number; label: string; desktopItems?: number; tabletItems?: number; mobileItems?: number; activeIndex?: number; gap?: number; compact?: boolean }>(), { desktopItems: 3, tabletItems: 2, mobileItems: 1, gap: 22, compact: false });
defineSlots<{ slide: (props: { index: number; visible: boolean }) => VNode[] }>();
const helpId = useId();

// STATE (refs/reactive)
// COMPOSABLES(useX)
const { viewport, navigation, interactions } = useCarousel(() => props);

// STORE
// COMPUTED
// FUNCTIONS
// WATCHERS
// LIFECYCLE
</script>

<style scoped>
.carousel-ta { min-width: 0; }
.carousel-ta__viewport { overflow: hidden; touch-action: pan-y pinch-zoom; border-radius: 28px; }
.carousel-ta__viewport:focus-visible { outline: 2px solid #2997ff; outline-offset: 5px; }
.carousel-ta__track { display: flex; width: 100%; align-items: stretch; transition: transform 520ms cubic-bezier(.22,.68,0,1); }
.carousel-ta__slide { min-width: 0; flex-grow: 0; flex-shrink: 0; }
.carousel-ta__navigation { display: flex; align-items: center; justify-content: space-between; gap: 16px; margin-top: 22px; }
.carousel-ta__position { color: #c2c2ca; font-size: 10px; font-variant-numeric: tabular-nums; letter-spacing: 1px; white-space: nowrap; }
.carousel-ta__position > span { color: #7e7e88; margin-left: 5px; }
.carousel-ta__controls { display: flex; align-items: center; gap: 8px; }
.carousel-ta__arrow { display: grid; place-items: center; width: 44px; height: 44px; padding: 0; border: 1px solid #38383e; border-radius: 50%; background: #171719; color: #ececf0; transition: background .2s, border-color .2s, opacity .2s; }
.carousel-ta__arrow:hover:not(:disabled) { background: #28282d; border-color: #696971; }
.carousel-ta__arrow:disabled { opacity: .28; cursor: default; }
.carousel-ta__pages { display: flex; align-items: center; gap: 1px; margin-right: 12px; }
.carousel-ta__pages button { display: grid; place-items: center; width: 24px; height: 44px; padding: 0; border: 0; background: transparent; }
.carousel-ta__pages span { width: 4px; height: 4px; border-radius: 999px; background: #55555f; transition: width .25s, background .25s; }
.carousel-ta__pages button[aria-current="true"] span { width: 17px; background: #d7d7df; }
.carousel-ta__pages button:hover span { background: #a7a7b0; }
.carousel-ta--compact .carousel-ta__viewport { border-radius: 12px; }
.carousel-ta--compact .carousel-ta__navigation { margin-top: 12px; }
.carousel-ta--compact .carousel-ta__position { font-size: 9px; }
.carousel-ta__sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; border: 0; }
@media (max-width: 640px) { .carousel-ta__navigation { margin-top: 18px; } .carousel-ta__pages { margin-right: 4px; } .carousel-ta__pages button { width: 20px; } .carousel-ta--compact .carousel-ta__pages { display: none; } }
@media (prefers-reduced-motion: reduce) { .carousel-ta__track, .carousel-ta__arrow, .carousel-ta__pages span { transition: none; } }
</style>
