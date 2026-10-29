// IMPORTS
import { describe, expect, it } from 'vitest';
import { filterVehicles } from '@/modules/catalog/catalog.service';
import type { CatalogFilters, Vehicle } from '@/modules/catalog/types';

// PROPS/CONSTANTS/ROUTE/RUNTIME CONFIG
const defaults: CatalogFilters = { search: '', brand: '', fuel: '', bodyType: '', maxPrice: '', favoritesOnly: false, sort: 'recent' };
const vehicle = (id: string, changes: Partial<Vehicle>): Vehicle => ({ id, slug: id, title: '', brand: '', model: '', version: '', year: 2022, price: 50000000, mileage: 25000, transmission: 'Automática', fuel: 'Gasolina', bodyType: 'SUV', color: 'Gris', engine: '', featured: false, image: '', gallery: [], originalUrl: '', description: '', features: [], specifications: [], ...changes });
const catalog = [vehicle('a', { title: 'Citroën C3', brand: 'Citroën', model: 'C3', price: 60000000 }), vehicle('b', { title: 'Audi Q8', brand: 'Audi', model: 'Q8', price: 319900000, fuel: 'Híbrido' }), vehicle('c', { title: 'Audi Q3', brand: 'Audi', model: 'Q3', price: 120000000, mileage: 10000 })];

// TESTS
describe('catálogo de vehículos', () => {
  it('encuentra una marca con tilde desde una búsqueda sin acentos', () => {
    expect(filterVehicles(catalog, { ...defaults, search: 'citroen' }).map((item) => item.id)).toEqual(['a']);
  });

  it('combina marca y presupuesto incluyendo el límite exacto', () => {
    expect(filterVehicles(catalog, { ...defaults, brand: 'audi', maxPrice: '120000000' }).map((item) => item.id)).toEqual(['c']);
  });

  it('limita favoritos a vehículos guardados que cumplan los filtros', () => {
    expect(filterVehicles(catalog, { ...defaults, favoritesOnly: true, fuel: 'Gasolina' }, ['b', 'c']).map((item) => item.id)).toEqual(['c']);
    expect(filterVehicles(catalog, { ...defaults, favoritesOnly: true }, [])).toEqual([]);
  });

  it('muestra primero la publicación más reciente sin depender del orden de origen', () => {
    const dated = [vehicle('a', { publishedAt: '2026-10-28T12:00:00Z' }), vehicle('b', { publishedAt: '2026-10-29T15:00:00Z' })];
    expect(filterVehicles(dated, defaults).map((item) => item.id)).toEqual(['b', 'a']);
  });

  it('ordena por precio sin modificar el orden original del inventario', () => {
    expect(filterVehicles(catalog, { ...defaults, sort: 'price-desc' }).map((item) => item.id)).toEqual(['b', 'c', 'a']);
    expect(catalog.map((item) => item.id)).toEqual(['a', 'b', 'c']);
  });
});
