// IMPORTS
import {
  computed,
  onBeforeUnmount,
  onMounted,
  readonly,
  ref,
  shallowRef,
} from "vue";
import type {
  ScrollVectorReturn,
  VectorPoint,
} from "@/composables/scroll-vector/types";

// PROPS/CONSTANTS/ROUTE/RUNTIME CONFIG
const STATIC_PROGRESS = 0.58;
const LANDMARK_POSITIONS = [0.24, 0.53, 0.79];

export const useScrollVector = (): ScrollVectorReturn => {
  // STATE (refs/reactive)
  const container = shallowRef<HTMLDivElement | null>(null);
  const path = shallowRef<SVGPathElement | null>(null);
  const progress = ref(0);
  const reduced = ref(false);
  const marker = shallowRef<VectorPoint>({ x: -80, y: 256 });
  const landmarks = shallowRef<readonly VectorPoint[]>([]);
  let observer: IntersectionObserver | null = null;
  let resizeObserver: ResizeObserver | null = null;
  let preference: MediaQueryList | null = null;
  let frame: number | null = null;
  let pathLength = 0;
  let visible = false;
  let tracking = false;

  // COMPOSABLES(useX)
  // STORE

  // COMPUTED
  const dashOffset = computed(() => 100 - progress.value * 100);

  // FUNCTIONS
  const pointAt = (position: number): VectorPoint => {
    if (!path.value || pathLength === 0) return { x: -80, y: 256 };
    const point = path.value.getPointAtLength(pathLength * position);
    return { x: point.x, y: point.y };
  };

  const renderProgress = (position: number): void => {
    progress.value = Math.min(1, Math.max(0, position));
    marker.value = pointAt(progress.value);
  };

  const update = (): void => {
    frame = null;
    if (!container.value || !visible || reduced.value) return;
    const bounds = container.value.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const travel = viewportHeight + bounds.height;
    renderProgress(travel > 0 ? (viewportHeight - bounds.top) / travel : 0);
  };

  const requestUpdate = (): void => {
    if (frame !== null || !visible || reduced.value) return;
    frame = window.requestAnimationFrame(update);
  };

  const stopTracking = (): void => {
    window.removeEventListener("scroll", requestUpdate);
    window.removeEventListener("resize", requestUpdate);
    resizeObserver?.disconnect();
    tracking = false;
    if (frame !== null) window.cancelAnimationFrame(frame);
    frame = null;
  };

  const syncTracking = (): void => {
    if (!visible || reduced.value) {
      stopTracking();
      if (reduced.value) renderProgress(STATIC_PROGRESS);
      return;
    }
    if (!tracking) {
      window.addEventListener("scroll", requestUpdate, { passive: true });
      window.addEventListener("resize", requestUpdate, { passive: true });
      if (container.value) resizeObserver?.observe(container.value);
      resizeObserver?.observe(document.body);
      tracking = true;
    }
    requestUpdate();
  };

  const syncPreference = (): void => {
    reduced.value = preference?.matches ?? false;
    syncTracking();
  };

  // WATCHERS
  // LIFECYCLE
  onMounted(() => {
    if (!container.value || !path.value) return;
    pathLength = path.value.getTotalLength();
    landmarks.value = LANDMARK_POSITIONS.map(pointAt);
    preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    preference.addEventListener("change", syncPreference);
    syncPreference();

    if (!("IntersectionObserver" in window)) {
      renderProgress(STATIC_PROGRESS);
      return;
    }
    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(requestUpdate);
    }
    observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry?.isIntersecting ?? false;
        syncTracking();
      },
      { threshold: 0 },
    );
    observer.observe(container.value);
  });

  onBeforeUnmount(() => {
    stopTracking();
    observer?.disconnect();
    preference?.removeEventListener("change", syncPreference);
  });

  return {
    elements: { container, path },
    motion: {
      dashOffset,
      marker: readonly(marker),
      landmarks: readonly(landmarks),
      reduced: readonly(reduced),
    },
  };
};
