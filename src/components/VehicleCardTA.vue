<template>
  <article class="vehicle-card">
    <div class="vehicle-card__media">
      <RouterLink :to="`/ficha_tecnica/${vehicle.id}`" :aria-label="`Ver ${vehicle.title}`" tabindex="-1">
        <img :src="vehicle.image" :alt="vehicle.title" loading="lazy" width="640" height="440" />
      </RouterLink>
      <span class="vehicle-card__badge">{{ vehicle.year }}</span>
      <button class="vehicle-card__favorite" type="button" :aria-label="favoriteActions.has(vehicle.id) ? `Quitar ${vehicle.title} de favoritos` : `Guardar ${vehicle.title} en favoritos`" :aria-pressed="favoriteActions.has(vehicle.id)" @click="favoriteActions.toggle(vehicle.id)">
        <Heart :size="17" :fill="favoriteActions.has(vehicle.id) ? 'currentColor' : 'none'" />
      </button>
    </div>
    <div class="vehicle-card__body">
      <span class="vehicle-card__brand">{{ vehicle.brand }}</span>
      <RouterLink class="vehicle-card__title" :to="`/ficha_tecnica/${vehicle.id}`">{{ vehicle.model }} <span>{{ vehicle.version }}</span></RouterLink>
      <p class="vehicle-card__metadata"><span>{{ formatMileage(vehicle.mileage) }}</span><span>{{ vehicle.transmission }}</span><span>{{ vehicle.fuel }}</span></p>
      <div class="vehicle-card__bottom">
        <p>{{ formatPrice(vehicle.price) }} <span>COP</span></p>
        <RouterLink :to="`/ficha_tecnica/${vehicle.id}`" class="vehicle-card__arrow" :aria-label="`Explorar ${vehicle.title}`"><ArrowUpRight :size="19" /></RouterLink>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
// IMPORTS
import { RouterLink } from 'vue-router';
import { ArrowUpRight, Heart } from '@lucide/vue';
import { formatMileage, formatPrice } from '@/modules/catalog/catalog.service';
import { useVehicleFavorites } from '@/modules/catalog/composables/useVehicleFavorites';
import type { Vehicle } from '@/modules/catalog/types';

// PROPS/CONSTANTS/ROUTE/RUNTIME CONFIG
defineProps<{ vehicle: Vehicle }>();

// COMPOSABLES(useX)
const { actions: favoriteActions } = useVehicleFavorites();
</script>

<style scoped>
.vehicle-card { min-width: 0; overflow: hidden; border: 1px solid #262628; border-radius: 28px; background: #0e0e0e; transition: border-color .25s; }
.vehicle-card:hover { border-color: #54545a; }
.vehicle-card__media { position: relative; aspect-ratio: 16 / 11; background: #1d1d1f; overflow: hidden; }
.vehicle-card__media a { display: block; height: 100%; }
.vehicle-card__media img { width: 100%; height: 100%; object-fit: cover; transition: transform .6s; }
.vehicle-card:hover img { transform: scale(1.04); }
.vehicle-card__badge { position: absolute; top: 18px; left: 18px; padding: 6px 11px; border-radius: 20px; background: rgba(0,0,0,.64); color: #f5f5f7; font-size: 11px; backdrop-filter: blur(12px); }
.vehicle-card__favorite { position: absolute; top: 15px; right: 15px; display: grid; place-items: center; width: 36px; height: 36px; border: 1px solid #ffffff30; border-radius: 50%; color: #f5f5f7; background: #0008; cursor: pointer; backdrop-filter: blur(12px); }
.vehicle-card__favorite[aria-pressed="true"] { color: #2997ff; }
.vehicle-card__body { padding: 25px 24px 21px; }
.vehicle-card__brand { color: #9d9da2; font-size: 10px; letter-spacing: .16em; text-transform: uppercase; }
.vehicle-card__title { display: block; margin: 9px 0 12px; font-size: 21px; font-weight: 600; letter-spacing: -.6px; color: #f5f5f7; text-decoration: none; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.vehicle-card__title span { font-weight: 400; }
.vehicle-card__metadata { display: flex; flex-wrap: wrap; gap: 7px; color: #99999f; font-size: 10px; }
.vehicle-card__metadata span + span::before { content: '·'; margin-right: 7px; }
.vehicle-card__bottom { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 23px; padding-top: 17px; border-top: 1px solid #262628; }
.vehicle-card__bottom p { margin: 0; color: #f5f5f7; font-size: 20px; letter-spacing: -.5px; font-weight: 500; }
.vehicle-card__bottom p span { margin-left: 3px; font-size: 9px; font-weight: 400; letter-spacing: .03em; color: #86868b; }
.vehicle-card__arrow { display: grid; place-items: center; width: 33px; height: 33px; border-radius: 50%; background: #1d1d1f; color: #f5f5f7; transition: background .2s; }
.vehicle-card__arrow:hover { background: #0071e3; }
@media (prefers-reduced-motion: reduce) { .vehicle-card, .vehicle-card__media img { transition: none; } .vehicle-card:hover { transform: none; } }
</style>
