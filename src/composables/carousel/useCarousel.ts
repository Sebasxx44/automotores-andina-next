// IMPORTS
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import type { CarouselOptions, CarouselPoint, CarouselRange, CarouselReturn } from '@/composables/carousel/types';

// PROPS/CONSTANTS/ROUTE/RUNTIME CONFIG
export const getVisibleItems = (width: number, options: Pick<CarouselOptions, 'desktopItems' | 'tabletItems' | 'mobileItems'>): number => Math.max(1, Math.floor(width < 760 ? options.mobileItems : width < 1100 ? options.tabletItems : options.desktopItems));

export const getCarouselRange = (count: number, visibleItems: number, requestedPage: number): CarouselRange => {
  const itemCount = Math.max(0, Math.floor(count));
  const pageSize = Math.max(1, Math.floor(visibleItems));
  const totalPages = Math.max(1, Math.ceil(itemCount / pageSize));
  const page = Math.max(0, Math.min(Math.floor(requestedPage), totalPages - 1));
  const firstIndex = Math.min(page * pageSize, Math.max(0, itemCount - pageSize));
  return { page, totalPages, firstIndex, lastIndex: Math.min(itemCount - 1, firstIndex + pageSize - 1) };
};

export const getPageForIndex = (index: number, count: number, visibleItems: number): number => getCarouselRange(count, visibleItems, Math.floor(Math.max(0, index) / Math.max(1, visibleItems))).page;

export const getSwipeDirection = (start: CarouselPoint, end: CarouselPoint): -1 | 0 | 1 => {
  const horizontal = end.x - start.x;
  const vertical = end.y - start.y;
  if (Math.abs(horizontal) < 44 || Math.abs(horizontal) <= Math.abs(vertical) * 1.2) return 0;
  return horizontal < 0 ? 1 : -1;
};

export const useCarousel = (options: () => CarouselOptions): CarouselReturn => {
  // STATE (refs/reactive)
  const element = ref<HTMLElement | null>(null);
  const width = ref(0);
  const screenWidth = ref(typeof window === 'undefined' ? 1200 : window.innerWidth);
  const page = ref(0);
  let observer: ResizeObserver | undefined;
  let touchOrigin: CarouselPoint | undefined;
  let suppressClickUntil = 0;

  // COMPOSABLES(useX)
  // STORE
  // COMPUTED
  const visibleItems = computed(() => getVisibleItems(screenWidth.value, options()));
  const range = computed(() => getCarouselRange(options().count, visibleItems.value, page.value));
  const canPrevious = computed(() => range.value.page > 0);
  const canNext = computed(() => range.value.page < range.value.totalPages - 1);
  const trackStyle = computed(() => ({ gap: `${options().gap}px`, transform: `translate3d(-${range.value.firstIndex * ((width.value + options().gap) / visibleItems.value)}px, 0, 0)` }));
  const slideStyle = computed(() => ({ flexBasis: `calc((100% - ${(visibleItems.value - 1) * options().gap}px) / ${visibleItems.value})` }));

  // FUNCTIONS
  const measure = (): void => {
    width.value = element.value?.getBoundingClientRect().width ?? 0;
    screenWidth.value = window.innerWidth;
  };
  const goTo = (nextPage: number): void => { page.value = getCarouselRange(options().count, visibleItems.value, nextPage).page; };
  const previous = (): void => { goTo(page.value - 1); };
  const next = (): void => { goTo(page.value + 1); };
  const isVisible = (index: number): boolean => index >= range.value.firstIndex && index <= range.value.lastIndex;
  const revealActive = (): void => {
    const index = options().activeIndex;
    if (index !== undefined && !isVisible(index)) goTo(getPageForIndex(index, options().count, visibleItems.value));
  };
  const keydown = (event: KeyboardEvent): void => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.target instanceof HTMLElement && event.target.matches('input, textarea, select, [contenteditable="true"]')) return;
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight' && event.key !== 'Home' && event.key !== 'End') return;
    event.preventDefault();
    if (event.key === 'ArrowLeft') previous();
    if (event.key === 'ArrowRight') next();
    if (event.key === 'Home') goTo(0);
    if (event.key === 'End') goTo(range.value.totalPages - 1);
    element.value?.focus({ preventScroll: true });
  };
  const touchStart = (event: TouchEvent): void => {
    const touch = event.touches.length === 1 ? event.touches[0] : undefined;
    touchOrigin = touch ? { x: touch.clientX, y: touch.clientY } : undefined;
    suppressClickUntil = 0;
  };
  const touchEnd = (event: TouchEvent): void => {
    const touch = event.changedTouches[0];
    if (!touchOrigin || !touch) return;
    const direction = getSwipeDirection(touchOrigin, { x: touch.clientX, y: touch.clientY });
    touchOrigin = undefined;
    if (!direction) return;
    goTo(page.value + direction);
    suppressClickUntil = performance.now() + 350;
  };
  const touchCancel = (): void => { touchOrigin = undefined; };
  const clickCapture = (event: MouseEvent): void => {
    if (performance.now() >= suppressClickUntil) return;
    event.preventDefault();
    event.stopPropagation();
  };

  // WATCHERS
  watch(visibleItems, (current, previousCount) => {
    const anchor = options().activeIndex ?? page.value * previousCount;
    goTo(getPageForIndex(anchor, options().count, current));
  });
  watch(() => options().count, () => { goTo(page.value); revealActive(); });
  watch(() => options().activeIndex, revealActive, { immediate: true });

  // LIFECYCLE
  onMounted(() => {
    measure();
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(measure);
      if (element.value) observer.observe(element.value);
    }
    window.addEventListener('resize', measure, { passive: true });
  });
  onBeforeUnmount(() => {
    observer?.disconnect();
    window.removeEventListener('resize', measure);
  });

  // RETURN
  return { viewport: { element, visibleItems, trackStyle, slideStyle }, navigation: { range, canPrevious, canNext, previous, next, goTo, isVisible }, interactions: { keydown, touchStart, touchEnd, touchCancel, clickCapture } };
};
