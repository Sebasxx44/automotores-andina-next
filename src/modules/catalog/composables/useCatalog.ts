// IMPORTS
import { computed, reactive, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { filterVehicles, vehicles } from '@/modules/catalog/catalog.service';
import { useVehicleFavorites } from '@/modules/catalog/composables/useVehicleFavorites';
import type { CatalogComposable, CatalogFilters, CatalogSort } from '@/modules/catalog/types';

export const useCatalog = (): CatalogComposable => {
  // PROPS/CONSTANTS/ROUTE/RUNTIME CONFIG
  const route = useRoute();
  const router = useRouter();
  const defaultFilters: CatalogFilters = { search: '', brand: '', fuel: '', bodyType: '', maxPrice: '', favoritesOnly: false, sort: 'recent' };
  const queryString = (name: string): string => typeof route.query[name] === 'string' ? route.query[name] : '';
  const readSort = (): CatalogSort => {
    const value = queryString('orden');
    return value === 'price-asc' || value === 'price-desc' || value === 'mileage' ? value : 'recent';
  };

  // STATE (refs/reactive)
  const filters = reactive<CatalogFilters>({ ...defaultFilters });

  // COMPOSABLES(useX)
  const { favorites } = useVehicleFavorites();

  // COMPUTED
  const matchingVehicles = computed(() => filterVehicles(vehicles, filters, favorites.ids.value));
  const activeCount = computed(() => [filters.search, filters.brand, filters.fuel, filters.bodyType, filters.maxPrice, filters.favoritesOnly].filter(Boolean).length);
  const unique = (key: 'brand' | 'fuel' | 'bodyType'): string[] => [...new Set(vehicles.map((vehicle) => vehicle[key]).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'es'));

  // FUNCTIONS
  const reset = (): void => { Object.assign(filters, defaultFilters); };
  const syncFromRoute = (): void => {
    Object.assign(filters, { search: queryString('buscar'), brand: queryString('marca'), fuel: queryString('combustible'), bodyType: queryString('tipo'), maxPrice: queryString('precio'), favoritesOnly: queryString('favoritos') === '1', sort: readSort() });
  };

  // WATCHERS
  watch(() => route.query, syncFromRoute, { immediate: true });
  watch(filters, () => {
    const query: Record<string, string> = {};
    if (filters.search) query.buscar = filters.search;
    if (filters.brand) query.marca = filters.brand;
    if (filters.fuel) query.combustible = filters.fuel;
    if (filters.bodyType) query.tipo = filters.bodyType;
    if (filters.maxPrice) query.precio = filters.maxPrice;
    if (filters.favoritesOnly) query.favoritos = '1';
    if (filters.sort !== 'recent') query.orden = filters.sort;
    if (JSON.stringify(route.query) !== JSON.stringify(query)) void router.replace({ query });
  });

  // RETURN
  return { filters, results: { vehicles: matchingVehicles, total: vehicles.length, activeCount }, options: { brands: unique('brand'), fuels: unique('fuel'), bodyTypes: unique('bodyType') }, actions: { reset } };
};
