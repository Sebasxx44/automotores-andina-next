// IMPORTS
import { computed, ref } from 'vue';
import type { VehicleFavoritesComposable } from '@/modules/catalog/types';

// PROPS/CONSTANTS/ROUTE/RUNTIME CONFIG
const STORAGE_KEY = 'andina-favorite-vehicles';
const readFavorites = (): string[] => {
  try {
    const saved: string[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(saved) ? saved.filter((id) => typeof id === 'string') : [];
  } catch {
    return [];
  }
};

// STATE (refs/reactive)
const ids = ref<string[]>(readFavorites());

export const useVehicleFavorites = (): VehicleFavoritesComposable => {
  // COMPUTED
  const count = computed(() => ids.value.length);

  // FUNCTIONS
  const has = (id: string): boolean => ids.value.includes(id);
  const toggle = (id: string): void => {
    ids.value = has(id) ? ids.value.filter((item) => item !== id) : [...ids.value, id];
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids.value));
    } catch {
      // Favorites remain available in the current session when storage is disabled.
    }
  };

  // RETURN
  return { favorites: { ids, count }, actions: { has, toggle } };
};
