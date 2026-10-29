<template>
  <div class="catalog-page">
    <div class="container">
      <ActionHeaderTA eyebrow="ELIGE TU PRÓXIMO DESTINO" title="Encuentra tu siguiente historia." description="Explora nuestra selección de vehículos. El que imaginas, más cerca de lo que crees.">
        <template #actions>
          <button class="favorites-filter" type="button" :aria-pressed="filters.favoritesOnly" @click="filters.favoritesOnly = !filters.favoritesOnly"><Heart :size="16" :fill="filters.favoritesOnly ? 'currentColor' : 'none'" /> Mis favoritos <span>{{ favorites.count.value }}</span></button>
        </template>
      </ActionHeaderTA>
      <section class="catalog-filters" aria-label="Filtrar vehículos">
        <label class="catalog-search"><Search :size="18" /><input v-model="filters.search" type="search" placeholder="¿Cuál es el carro que tienes en mente?" aria-label="Buscar por marca, modelo o año" /></label>
        <div class="catalog-filter-grid">
          <label><span>Marca</span><select v-model="filters.brand"><option value="">Todas las marcas</option><option v-for="brand in options.brands" :key="brand" :value="brand">{{ brand }}</option></select><ChevronDown :size="14" /></label>
          <label><span>Carrocería</span><select v-model="filters.bodyType"><option value="">Todos los tipos</option><option v-for="bodyType in options.bodyTypes" :key="bodyType" :value="bodyType">{{ bodyType }}</option></select><ChevronDown :size="14" /></label>
          <label><span>Combustible</span><select v-model="filters.fuel"><option value="">Todos</option><option v-for="fuel in options.fuels" :key="fuel" :value="fuel">{{ fuel }}</option></select><ChevronDown :size="14" /></label>
          <label><span>Presupuesto</span><select v-model="filters.maxPrice"><option value="">Sin límite</option><option value="50000000">Hasta $50 millones</option><option value="60000000">Hasta $60 millones</option><option value="80000000">Hasta $80 millones</option><option value="100000000">Hasta $100 millones</option><option value="120000000">Hasta $120 millones</option><option value="200000000">Hasta $200 millones</option><option value="350000000">Hasta $350 millones</option></select><ChevronDown :size="14" /></label>
        </div>
      </section>
      <div class="catalog-toolbar">
        <p role="status" aria-live="polite"><strong>{{ results.vehicles.value.length }}</strong> vehículos {{ filters.favoritesOnly ? 'guardados' : 'para descubrir' }} <span v-if="results.activeCount.value">de {{ results.total }}</span></p>
        <div class="catalog-toolbar__actions">
          <button v-if="results.activeCount.value" class="reset-filters" type="button" @click="actions.reset"><X :size="14" /> Limpiar filtros</button>
          <label class="catalog-sort"><ArrowDownUp :size="14" /><select v-model="filters.sort" aria-label="Ordenar vehículos"><option value="recent">Más recientes</option><option value="price-asc">Menor precio</option><option value="price-desc">Mayor precio</option><option value="mileage">Menor kilometraje</option></select><ChevronDown :size="12" /></label>
        </div>
      </div>
      <div v-if="results.vehicles.value.length" class="catalog-grid">
        <VehicleCardTA v-for="vehicle in results.vehicles.value" :key="vehicle.id" :vehicle="vehicle" />
      </div>
      <div v-else class="catalog-empty">
        <Search :size="34" :stroke-width="1" />
        <h2>{{ filters.favoritesOnly ? 'Tu próxima historia aún está por guardar.' : 'Probemos con un nuevo camino.' }}</h2>
        <p>{{ filters.favoritesOnly ? 'Toca el corazón de un vehículo para encontrarlo aquí cuando vuelvas.' : 'No encontramos vehículos con estos filtros. Amplía tu búsqueda para descubrir más opciones.' }}</p>
        <ButtonTA variant="secondary" @click="actions.reset">Ver todos los vehículos <ArrowUpRight :size="16" /></ButtonTA>
      </div>
      <div class="catalog-assistance"><div><span class="eyebrow">TE ACOMPAÑAMOS</span><h2>¿Tienes uno en mente?</h2><p>Cuéntanos qué buscas. Nuestro equipo te ayuda a encontrarlo.</p></div><ButtonTA href="https://wa.me/573026606878?text=Hola%2C%20quiero%20asesor%C3%ADa%20para%20encontrar%20mi%20pr%C3%B3ximo%20veh%C3%ADculo." variant="secondary">Hablar con un asesor <ArrowUpRight :size="16" /></ButtonTA></div>
      <p class="catalog-disclaimer">Catálogo tomado del sitio original. Confirma disponibilidad, precio y condiciones directamente con Automotores Andina antes de comprar.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// IMPORTS
import { ArrowDownUp, ArrowUpRight, ChevronDown, Heart, Search, X } from '@lucide/vue';
import ActionHeaderTA from '@/components/shared/ActionHeaderTA.vue';
import ButtonTA from '@/components/ButtonTA.vue';
import VehicleCardTA from '@/components/VehicleCardTA.vue';
import { useCatalog } from '@/modules/catalog/composables/useCatalog';
import { useVehicleFavorites } from '@/modules/catalog/composables/useVehicleFavorites';

// COMPOSABLES(useX)
const { filters, results, options, actions } = useCatalog();
const { favorites } = useVehicleFavorites();
</script>

<style scoped>
.catalog-page { padding: 50px 0 80px; }
.favorites-filter { display: inline-flex; align-items: center; gap: 9px; border: 1px solid #333336; color: #f5f5f7; background: #0e0e0e; padding: 12px 17px; border-radius: 99px; font-size: 12px; cursor: pointer; }
.favorites-filter[aria-pressed="true"] { border-color: #2997ff; color: #2997ff; }
.favorites-filter span { display: grid; place-items: center; min-width: 20px; height: 20px; background: #29292c; border-radius: 50%; font-size: 10px; }
.catalog-filters { border: 1px solid #29292c; border-radius: 28px; background: #0e0e0e; overflow: hidden; margin-top: 42px; }
.catalog-search { display: flex; align-items: center; gap: 14px; color: #9b9ba1; padding: 22px 26px; border-bottom: 1px solid #29292c; }
.catalog-search input { width: 100%; border: 0; background: transparent; color: #f5f5f7; outline: none; font-size: 14px; }
.catalog-search input::placeholder { color: #86868b; }
.catalog-search:focus-within { outline: 1px solid #2997ff; outline-offset: -2px; }
.catalog-filter-grid { display: grid; grid-template-columns: repeat(4, 1fr); padding: 20px 8px; }
.catalog-filter-grid label { position: relative; padding: 0 24px; display: grid; gap: 8px; }
.catalog-filter-grid label + label { border-left: 1px solid #333336; }
.catalog-filter-grid label > span { color: #86868b; font-size: 10px; }
.catalog-filter-grid select { appearance: none; color: #f5f5f7; border: none; background: transparent; padding-right: 20px; width: 100%; font-size: 12px; cursor: pointer; }
.catalog-filter-grid label > svg { position: absolute; right: 24px; bottom: 2px; color: #86868b; pointer-events: none; }
select option { background: #1d1d1f; color: #f5f5f7; }
.catalog-toolbar { display: flex; align-items: center; justify-content: space-between; gap: 20px; margin: 32px 0 24px; }
.catalog-toolbar p { color: #9d9da2; font-size: 12px; }
.catalog-toolbar strong { color: #f5f5f7; font-weight: 500; }
.catalog-toolbar p > span { color: #86868b; }
.catalog-toolbar__actions { display: flex; align-items: center; gap: 24px; }
.reset-filters { display: inline-flex; align-items: center; gap: 5px; padding: 5px 0; background: none; border: 0; color: #2997ff; font-size: 11px; cursor: pointer; }
.catalog-sort { display: flex; align-items: center; gap: 8px; color: #b2b2b7; }
.catalog-sort select { appearance: none; background: transparent; border: 0; color: #b2b2b7; font-size: 11px; cursor: pointer; }
.catalog-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; }
.catalog-empty { padding: 90px 20px; display: flex; align-items: center; flex-direction: column; text-align: center; color: #86868b; }
.catalog-empty h2 { color: #f5f5f7; font-size: 28px; letter-spacing: -.8px; margin: 22px 0 10px; }
.catalog-empty p { max-width: 440px; font-size: 14px; line-height: 1.6; margin-bottom: 28px; }
.catalog-assistance { display: flex; justify-content: space-between; align-items: center; gap: 30px; margin-top: 70px; padding: 42px; border: 1px solid #29292c; border-radius: 28px; }
.catalog-assistance h2 { font-size: 32px; margin: 12px 0; letter-spacing: -1px; color: #f5f5f7; }
.catalog-assistance p { color: #86868b; font-size: 13px; }
.catalog-disclaimer { max-width: 700px; margin: 28px auto 0; color: #86868b; text-align: center; font-size: 10px; line-height: 1.6; }
@media (max-width: 1000px) { .catalog-grid { grid-template-columns: repeat(2, minmax(0,1fr)); } }
@media (max-width: 640px) { .catalog-page { padding-top: 24px; } .catalog-grid { grid-template-columns: 1fr; gap: 20px; } .catalog-filter-grid { grid-template-columns: 1fr 1fr; gap: 24px 0; } .catalog-filter-grid label:nth-child(3) { border-left: none; } .catalog-filters { margin-top: 28px; } .catalog-search { padding: 20px; } .catalog-search input { font-size: 12px; } .catalog-toolbar { align-items: flex-start; gap: 14px; flex-direction: column; } .catalog-toolbar__actions { width: 100%; justify-content: space-between; flex-direction: row-reverse; } .catalog-assistance { flex-direction: column; align-items: flex-start; padding: 28px; margin-top: 40px; } .catalog-assistance h2 { font-size: 28px; } }
</style>
