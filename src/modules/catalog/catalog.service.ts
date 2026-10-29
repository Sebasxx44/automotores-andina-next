// IMPORTS
import inventory from '@/data/inventory.json';
import type { CatalogFilters, Vehicle } from '@/modules/catalog/types';

// SERVICE PROPERTIES
export const vehicles: Vehicle[] = inventory;
const normalize = (value: string): string => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

// METHODS
export const formatPrice = (value: number): string => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(value);
export const formatMileage = (value: number): string => `${new Intl.NumberFormat('es-CO').format(value)} km`;

export const filterVehicles = (catalog: Vehicle[], filters: CatalogFilters, favoriteIds: string[] = []): Vehicle[] => {
  const search = normalize(filters.search.trim());
  const filtered = catalog.filter((vehicle) => {
    const text = normalize(`${vehicle.brand} ${vehicle.model} ${vehicle.version} ${vehicle.title} ${vehicle.year}`);
    return (!search || text.includes(search))
      && (!filters.brand || normalize(vehicle.brand) === normalize(filters.brand))
      && (!filters.fuel || vehicle.fuel === filters.fuel)
      && (!filters.bodyType || vehicle.bodyType === filters.bodyType)
      && (!filters.maxPrice || vehicle.price <= Number(filters.maxPrice))
      && (!filters.favoritesOnly || favoriteIds.includes(vehicle.id));
  });
  if (filters.sort === 'price-asc') return filtered.sort((a, b) => a.price - b.price);
  if (filters.sort === 'price-desc') return filtered.sort((a, b) => b.price - a.price);
  if (filters.sort === 'mileage') return filtered.sort((a, b) => a.mileage - b.mileage);
  return filtered.sort((a, b) => Date.parse(b.publishedAt || '1970-01-01') - Date.parse(a.publishedAt || '1970-01-01'));
};
