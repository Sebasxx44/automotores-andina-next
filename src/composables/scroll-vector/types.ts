// IMPORTS
import type { ComputedRef, Ref, ShallowRef } from "vue";

// TYPES
export interface VectorPoint {
  x: number;
  y: number;
}

export interface ScrollVectorReturn {
  elements: {
    container: ShallowRef<HTMLDivElement | null>;
    path: ShallowRef<SVGPathElement | null>;
  };
  motion: {
    dashOffset: ComputedRef<number>;
    marker: Readonly<ShallowRef<VectorPoint>>;
    landmarks: Readonly<ShallowRef<readonly VectorPoint[]>>;
    reduced: Readonly<Ref<boolean>>;
  };
}
