// IMPORTS
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { vehicles } from '@/modules/catalog/catalog.service';
import type { VehicleDetailComposable } from '@/modules/catalog/types';

export const useVehicleDetail = (): VehicleDetailComposable => {
  // PROPS/CONSTANTS/ROUTE/RUNTIME CONFIG
  const route = useRoute();

  // STATE (refs/reactive)
  const activeIndex = ref(0);

  // COMPUTED
  const vehicle = computed(() => vehicles.find((item) => item.id === route.params.id || item.slug === route.params.slug));
  const images = computed(() => vehicle.value ? [...new Set([vehicle.value.image, ...vehicle.value.gallery])] : []);
  const currentImage = computed(() => images.value[activeIndex.value] || images.value[0] || '');
  const related = computed(() => vehicles.filter((item) => item.id !== vehicle.value?.id && (item.brand === vehicle.value?.brand || item.bodyType === vehicle.value?.bodyType)).slice(0, 3));
  const whatsappUrl = computed(() => `https://wa.me/573026606878?text=${encodeURIComponent(`Hola, me interesa ${vehicle.value?.title || 'un vehículo'} de Automotores Andina. Quisiera confirmar disponibilidad y agendar una visita. ${vehicle.value?.originalUrl || ''}`)}`);

  // FUNCTIONS
  const select = (index: number): void => { activeIndex.value = index; };
  const previous = (): void => { activeIndex.value = (activeIndex.value - 1 + images.value.length) % images.value.length; };
  const next = (): void => { activeIndex.value = (activeIndex.value + 1) % images.value.length; };

  // WATCHERS
  watch(vehicle, () => { activeIndex.value = 0; });

  // RETURN
  return { product: { vehicle, related, images, currentImage, whatsappUrl }, gallery: { activeIndex, select, previous, next } };
};
