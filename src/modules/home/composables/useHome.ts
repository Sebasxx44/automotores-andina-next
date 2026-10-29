// IMPORTS
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import inventory from '@/data/inventory.json';
import type { Vehicle } from '@/modules/catalog/types';
import type { HomeReturn } from '@/modules/home/types';

export const useHome = (): HomeReturn => {
  // PROPS/CONSTANTS/ROUTE/RUNTIME CONFIG
  const router = useRouter();
  const catalog: Vehicle[] = inventory;
  const preferredIds = ['e139eefa-9961-4bde-8246-a4e93bd2a13e', '354d43e2-a7f6-408f-b4b9-e14b0c2e9b09'];
  const slides = preferredIds.flatMap((id) => catalog.filter((vehicle) => vehicle.id === id));
  const brands = [...new Set(catalog.map((vehicle) => vehicle.brand))].sort();
  // STATE (refs/reactive)
  const selected = ref<'recent' | 'featured'>('recent');
  const brand = ref('');
  const budget = ref('');
  const index = ref(0);
  // COMPOSABLES(useX)
  // STORE
  // COMPUTED
  const vehicles = computed(() => (selected.value === 'featured' ? catalog.filter((vehicle) => vehicle.featured) : [...catalog].sort((first, second) => (second.publishedAt ?? '').localeCompare(first.publishedAt ?? ''))).slice(0, 3));
  const current = computed(() => slides[index.value]);
  // FUNCTIONS
  const explore = () => { void router.push({ path: '/catalogo', query: { ...(brand.value ? { marca: brand.value } : {}), ...(budget.value ? { precio: budget.value } : {}) } }); };
  const select = (nextIndex: number) => { index.value = nextIndex; };
  // WATCHERS
  // LIFECYCLE
  // RETURN
  return { showcase: { selected, vehicles, total: catalog.length }, discovery: { brand, budget, brands, explore }, hero: { current, index, slides, select } };
};
