// IMPORTS
import type { ComputedRef, Ref } from 'vue';

// TYPES
export interface Vehicle {
  id: string;
  slug: string;
  title: string;
  brand: string;
  model: string;
  version: string;
  year: number;
  price: number;
  mileage: number;
  transmission: string;
  fuel: string;
  bodyType: string;
  color: string;
  engine: string;
  featured: boolean;
  image: string;
  gallery: string[];
  originalUrl: string;
  description: string;
  features: string[];
  specifications: { label: string; value: string }[];
  publishedAt?: string;
  location?: string;
}

export type CatalogSort = 'recent' | 'price-asc' | 'price-desc' | 'mileage';

export interface CatalogFilters {
  search: string;
  brand: string;
  fuel: string;
  bodyType: string;
  maxPrice: string;
  favoritesOnly: boolean;
  sort: CatalogSort;
}

export interface CatalogComposable {
  filters: CatalogFilters;
  results: {
    vehicles: ComputedRef<Vehicle[]>;
    total: number;
    activeCount: ComputedRef<number>;
  };
  options: { brands: string[]; fuels: string[]; bodyTypes: string[] };
  actions: { reset: () => void };
}

export interface VehicleFavoritesComposable {
  favorites: {
    ids: Ref<string[]>;
    count: ComputedRef<number>;
  };
  actions: { has: (id: string) => boolean; toggle: (id: string) => void };
}

export interface VehicleDetailComposable {
  product: {
    vehicle: ComputedRef<Vehicle | undefined>;
    related: ComputedRef<Vehicle[]>;
    images: ComputedRef<string[]>;
    currentImage: ComputedRef<string>;
    whatsappUrl: ComputedRef<string>;
  };
  gallery: {
    activeIndex: Ref<number>;
    select: (index: number) => void;
    previous: () => void;
    next: () => void;
  };
}
