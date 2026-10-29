import type { ComputedRef, Ref } from 'vue';
import type { Vehicle } from '@/modules/catalog/types';

export interface HomeReturn {
  showcase: {
    selected: Ref<'recent' | 'featured'>;
    vehicles: ComputedRef<Vehicle[]>;
    total: number;
  };
  discovery: {
    brand: Ref<string>;
    budget: Ref<string>;
    brands: string[];
    explore: () => void;
  };
  hero: {
    current: ComputedRef<Vehicle | undefined>;
    index: Ref<number>;
    slides: Vehicle[];
    select: (index: number) => void;
  };
}
