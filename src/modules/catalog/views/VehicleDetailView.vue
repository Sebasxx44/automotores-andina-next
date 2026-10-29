<template>
  <div class="detail-page">
    <div v-if="product.vehicle.value" class="container">
      <RouterLink to="/catalogo" class="detail-back"><ArrowLeft :size="14" /> Volver al catálogo</RouterLink>
      <ActionHeaderTA :eyebrow="`${product.vehicle.value?.brand} · ${product.vehicle.value.year}`" :title="`${product.vehicle.value.brand} ${product.vehicle.value.model}`" :description="product.vehicle.value.version" compact>
        <template #actions><button type="button" class="detail-save" :aria-pressed="favoriteActions.has(product.vehicle.value.id)" @click="favoriteActions.toggle(product.vehicle.value.id)"><Heart :size="16" :fill="favoriteActions.has(product.vehicle.value.id) ? 'currentColor' : 'none'" /> {{ favoriteActions.has(product.vehicle.value.id) ? 'Guardado' : 'Guardar vehículo' }}</button></template>
      </ActionHeaderTA>
      <div class="detail-layout">
        <div class="detail-visual">
          <div class="detail-gallery" role="region" aria-label="Fotografías del vehículo" @keydown.left="gallery.previous" @keydown.right="gallery.next">
            <Transition name="vehicle-photo">
              <img :key="product.currentImage.value" :src="product.currentImage.value" :alt="`${product.vehicle.value.title}, fotografía ${gallery.activeIndex.value + 1}`" fetchpriority="high" decoding="async" draggable="false" />
            </Transition>
            <template v-if="product.images.value.length > 1"><button class="gallery-prev" type="button" aria-label="Fotografía anterior" @click="gallery.previous"><ChevronLeft :size="19" /></button><button class="gallery-next" type="button" aria-label="Siguiente fotografía" @click="gallery.next"><ChevronRight :size="19" /></button></template>
            <span class="gallery-counter"><Images :size="13" /> {{ gallery.activeIndex.value + 1 }} / {{ product.images.value.length }}</span>
          </div>
          <CarouselTA :key="product.vehicle.value.id" class="detail-thumbnails" :count="product.images.value.length" label="Seleccionar fotografía del vehículo" :desktop-items="5" :tablet-items="4" :mobile-items="3" :gap="10" :active-index="gallery.activeIndex.value" compact>
            <template #slide="{ index }">
              <button class="detail-thumbnail" type="button" :class="{ active: gallery.activeIndex.value === index }" :aria-label="`Ver fotografía ${index + 1}`" :aria-pressed="gallery.activeIndex.value === index" @click="gallery.select(index)"><img :src="product.images.value[index]" alt="" loading="lazy" decoding="async" draggable="false" /></button>
            </template>
          </CarouselTA>
        </div>
        <aside class="detail-purchase">
          <span class="eyebrow">TU PRÓXIMO DESTINO</span>
          <p class="detail-price">{{ formatPrice(product.vehicle.value.price) }}<span>COP</span></p>
          <p class="detail-price-note">Consulta disponibilidad con nuestro equipo.</p>
          <div class="detail-highlights"><div><Gauge :size="18" /><span>Kilometraje</span><strong>{{ formatMileage(product.vehicle.value.mileage) }}</strong></div><div><Settings2 :size="18" /><span>Transmisión</span><strong>{{ product.vehicle.value.transmission || 'Consultar' }}</strong></div><div><Fuel :size="18" /><span>Combustible</span><strong>{{ product.vehicle.value.fuel || 'Consultar' }}</strong></div><div><CalendarDays :size="18" /><span>Modelo</span><strong>{{ product.vehicle.value.year }}</strong></div></div>
          <ButtonTA :href="product.whatsappUrl.value">Me interesa este vehículo <ArrowUpRight :size="16" /></ButtonTA>
          <ButtonTA href="https://automotoresandina.financiakarz.com/" variant="secondary">Explorar financiación <ArrowUpRight :size="16" /></ButtonTA>
          <p class="detail-location"><MapPin :size="14" /> Automotores Andina · Pereira</p>
        </aside>
      </div>
      <section class="detail-specifications">
        <div><span class="eyebrow">CADA DETALLE CUENTA</span><h2>Conócelo a fondo.</h2><p v-if="product.vehicle.value?.description">{{ product.vehicle.value?.description }}</p><p v-else>Conoce las características de este {{ product.vehicle.value?.brand }} {{ product.vehicle.value?.model }} y agenda una visita para descubrirlo en persona.</p></div>
        <dl><div v-for="specification in product.vehicle.value?.specifications" :key="specification.label"><dt>{{ specification.label }}</dt><dd>{{ specification.value || 'Consultar' }}</dd></div></dl>
      </section>
      <section v-if="product.vehicle.value?.features.length" class="detail-features"><h2>Equipamiento</h2><ul><li v-for="feature in product.vehicle.value?.features" :key="feature"><Check :size="14" />{{ feature }}</li></ul></section>
      <section v-if="product.related.value.length" class="detail-related"><div class="section-heading"><div><span class="eyebrow">SIGUE EXPLORANDO</span><h2>Más caminos por descubrir.</h2></div><RouterLink to="/catalogo" class="text-link">Ver catálogo <ArrowUpRight :size="16" /></RouterLink></div><div class="detail-related-grid"><VehicleCardTA v-for="vehicle in product.related.value" :key="vehicle.id" :vehicle="vehicle" /></div></section>
      <p class="detail-disclaimer">Información e imágenes del catálogo original de Automotores Andina. El precio, la disponibilidad y las características deben confirmarse con un asesor. <a :href="product.vehicle.value?.originalUrl" target="_blank" rel="noopener noreferrer">Consultar publicación original <ArrowUpRight :size="10" /></a></p>
    </div>
    <div v-else class="container detail-not-found"><ActionHeaderTA eyebrow="CATÁLOGO ANDINA" title="Un nuevo camino te espera." description="No encontramos este vehículo en el catálogo actual." /><ButtonTA to="/catalogo">Explorar vehículos <ArrowUpRight :size="16" /></ButtonTA></div>
  </div>
</template>

<script setup lang="ts">
// IMPORTS
import { RouterLink } from 'vue-router';
import { ArrowLeft, ArrowUpRight, CalendarDays, Check, ChevronLeft, ChevronRight, Fuel, Gauge, Heart, Images, MapPin, Settings2 } from '@lucide/vue';
import ActionHeaderTA from '@/components/shared/ActionHeaderTA.vue';
import ButtonTA from '@/components/ButtonTA.vue';
import VehicleCardTA from '@/components/VehicleCardTA.vue';
import CarouselTA from '@/components/CarouselTA.vue';
import { formatMileage, formatPrice } from '@/modules/catalog/catalog.service';
import { useVehicleDetail } from '@/modules/catalog/composables/useVehicleDetail';
import { useVehicleFavorites } from '@/modules/catalog/composables/useVehicleFavorites';

// COMPOSABLES(useX)
const { product, gallery } = useVehicleDetail();
const { actions: favoriteActions } = useVehicleFavorites();
</script>

<style scoped>
.detail-page { padding: 36px 0 80px; }
.detail-back { display: inline-flex; align-items: center; gap: 8px; font-size: 11px; color: #a5a5ab; text-decoration: none; margin-bottom: 30px; }
.detail-save { display: inline-flex; align-items: center; gap: 8px; border: 1px solid #333336; border-radius: 99px; color: #f5f5f7; background: #0e0e0e; padding: 12px 18px; font-size: 12px; cursor: pointer; }
.detail-save[aria-pressed="true"] { color: #2997ff; border-color: #2997ff; }
.detail-layout { display: grid; grid-template-columns: minmax(0,1.5fr) minmax(300px,1fr); gap: 32px; align-items: start; margin-top: 34px; }
.detail-gallery { position: relative; overflow: hidden; border: 1px solid #29292c; border-radius: 28px; aspect-ratio: 4/3; background: #0e0e0e; }
.detail-gallery > img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.vehicle-photo-enter-active, .vehicle-photo-leave-active { transition: opacity 260ms ease; }
.vehicle-photo-enter-from, .vehicle-photo-leave-to { opacity: 0; }
.detail-gallery > button { position: absolute; top: calc(50% - 22px); z-index: 2; width: 44px; height: 44px; display: grid; place-items: center; background: #0009; color: #f5f5f7; border: 1px solid #ffffff40; border-radius: 50%; cursor: pointer; backdrop-filter: blur(12px); }
.gallery-prev { left: 18px; }.gallery-next { right: 18px; }
.gallery-counter { position: absolute; z-index: 2; bottom: 20px; right: 20px; display: inline-flex; gap: 7px; align-items: center; padding: 8px 12px; color: #f5f5f7; border-radius: 99px; background: #0009; font-size: 11px; backdrop-filter: blur(12px); }
.detail-thumbnails { margin-top: 14px; }
.detail-thumbnail { display: block; width: 100%; aspect-ratio: 4/3; max-height: 92px; padding: 0; border: 2px solid transparent; border-radius: 12px; overflow: hidden; background: #1d1d1f; cursor: pointer; opacity: .55; transition: opacity .2s; }
.detail-thumbnail.active { border-color: #2997ff; opacity: 1; }
.detail-thumbnail:hover { opacity: 1; }.detail-thumbnail img { width: 100%; height: 100%; object-fit: cover; }
.detail-purchase { padding: 32px; border: 1px solid #29292c; border-radius: 28px; background: #0e0e0e; display: flex; flex-direction: column; gap: 12px; }
.detail-price { display: flex; align-items: baseline; flex-wrap: wrap; gap: 8px; font-size: clamp(26px,3vw,38px); font-weight: 500; letter-spacing: -1.5px; margin: 7px 0 0; color: #f5f5f7; }
.detail-price > span { color: #86868b; font-size: 11px; letter-spacing: 0; }
.detail-price-note { color: #86868b; font-size: 11px; margin: 0; }
.detail-highlights { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin: 13px 0; padding: 27px 0; border-top: 1px solid #29292c; border-bottom: 1px solid #29292c; }
.detail-highlights > div { display: grid; gap: 7px; }.detail-highlights svg { color: #86868b; margin-bottom: 2px; }.detail-highlights span { font-size: 10px; color: #86868b; }.detail-highlights strong { font-size: 13px; color: #f5f5f7; font-weight: 500; }
.detail-location { display: flex; align-items: center; justify-content: center; gap: 6px; margin: 8px 0 0; color: #86868b; font-size: 10px; }
.detail-specifications { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; margin-top: 82px; padding-bottom: 56px; border-bottom: 1px solid #29292c; }
.detail-specifications h2, .detail-related h2 { font-size: clamp(28px,3vw,40px); letter-spacing: -1.4px; line-height: 1.1; color: #f5f5f7; margin: 14px 0 18px; }
.detail-specifications p { color: #9d9da2; line-height: 1.8; font-size: 13px; white-space: pre-line; }
.detail-specifications dl { margin: 0; }.detail-specifications dl > div { display: flex; justify-content: space-between; gap: 20px; padding: 14px 0; border-bottom: 1px solid #29292c; font-size: 12px; }.detail-specifications dt { color: #86868b; }.detail-specifications dd { margin: 0; color: #f5f5f7; text-align: right; }
.detail-features { padding: 40px 0; }.detail-features h2 { font-size: 24px; color: #f5f5f7; letter-spacing: -.6px; }.detail-features ul { display: grid; grid-template-columns: repeat(3,1fr); gap: 18px; padding: 0; list-style: none; }.detail-features li { display: flex; align-items: center; gap: 10px; color: #b2b2b7; font-size: 12px; }.detail-features svg { color: #2997ff; flex-shrink: 0; }
.detail-related { margin-top: 66px; }.detail-related-grid { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 24px; margin-top: 30px; }.detail-related .text-link { display: flex; gap: 8px; align-items: center; }
.detail-disclaimer { max-width: 760px; margin: 45px auto 0; text-align: center; font-size: 10px; line-height: 1.8; color: #86868b; }.detail-disclaimer a { color: #2997ff; display: inline-flex; gap: 4px; align-items: center; }
.detail-not-found { min-height: 55vh; padding-top: 50px; }
@media (max-width: 960px) { .detail-layout { grid-template-columns: 1fr; }.detail-purchase { max-width: none; }.detail-highlights { grid-template-columns: repeat(4,1fr); }.detail-specifications { gap: 40px; }.detail-related-grid { gap: 16px; } }
@media (max-width: 640px) { .detail-page { padding-top: 24px; }.detail-layout { gap: 20px; }.detail-purchase { padding: 26px; }.detail-highlights { grid-template-columns: 1fr 1fr; }.detail-specifications { grid-template-columns: 1fr; gap: 22px; margin-top: 50px; padding-bottom: 30px; }.detail-related-grid { grid-template-columns: 1fr; }.detail-features ul { grid-template-columns: 1fr 1fr; }.detail-related { margin-top: 44px; }.detail-thumbnail { max-height: 80px; }.detail-disclaimer { margin-top: 32px; } }
.detail-thumbnail:focus-visible { outline: 2px solid #2997ff; outline-offset: -5px; }
@media (prefers-reduced-motion: reduce) { .vehicle-photo-enter-active, .vehicle-photo-leave-active, .detail-thumbnail { transition: none; } }
</style>
