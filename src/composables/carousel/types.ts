// IMPORTS
import type { ComputedRef, CSSProperties, Ref } from 'vue';

// TYPES
export interface CarouselOptions {
  count: number;
  desktopItems: number;
  tabletItems: number;
  mobileItems: number;
  gap: number;
  activeIndex?: number;
}

export interface CarouselPoint {
  x: number;
  y: number;
}

export interface CarouselRange {
  page: number;
  totalPages: number;
  firstIndex: number;
  lastIndex: number;
}

export interface CarouselReturn {
  viewport: {
    element: Ref<HTMLElement | null>;
    visibleItems: ComputedRef<number>;
    trackStyle: ComputedRef<CSSProperties>;
    slideStyle: ComputedRef<CSSProperties>;
  };
  navigation: {
    range: ComputedRef<CarouselRange>;
    canPrevious: ComputedRef<boolean>;
    canNext: ComputedRef<boolean>;
    previous: () => void;
    next: () => void;
    goTo: (page: number) => void;
    isVisible: (index: number) => boolean;
  };
  interactions: {
    keydown: (event: KeyboardEvent) => void;
    touchStart: (event: TouchEvent) => void;
    touchEnd: (event: TouchEvent) => void;
    touchCancel: () => void;
    clickCapture: (event: MouseEvent) => void;
  };
}
