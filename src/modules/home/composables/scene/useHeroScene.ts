// IMPORTS
import { onBeforeUnmount, onMounted, ref } from 'vue';
import type { HeroSceneReturn } from '@/modules/home/composables/scene/types';

export const useHeroScene = (): HeroSceneReturn => {
  // PROPS/CONSTANTS/ROUTE/RUNTIME CONFIG
  // STATE (refs/reactive)
  const stage = ref<HTMLElement | null>(null);
  let preference: MediaQueryList | null = null;
  let observer: IntersectionObserver | null = null;
  let visible = false;
  let frame = 0;

  // COMPOSABLES(useX)
  // STORE
  // COMPUTED
  // FUNCTIONS
  const update = (): void => {
    frame = 0;
    if (!stage.value) return;
    if (preference?.matches) {
      stage.value.style.removeProperty('--hero-shift');
      stage.value.style.removeProperty('--hero-scale');
      return;
    }
    const bounds = stage.value.getBoundingClientRect();
    const progress = Math.min(Math.max(-bounds.top / bounds.height, 0), 1);
    stage.value.style.setProperty('--hero-shift', `${(progress * (window.innerWidth < 760 ? 20 : 54)).toFixed(2)}px`);
    stage.value.style.setProperty('--hero-scale', (1 + progress * 0.035).toFixed(4));
  };
  const schedule = (): void => {
    if (!frame && visible && !preference?.matches) frame = requestAnimationFrame(update);
  };
  const changePreference = (): void => {
    cancelAnimationFrame(frame);
    frame = 0;
    update();
  };

  // WATCHERS
  // LIFECYCLE
  onMounted(() => {
    preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!('IntersectionObserver' in window)) return;
    observer = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      if (visible) schedule();
    });
    if (stage.value) observer.observe(stage.value);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    preference.addEventListener('change', changePreference);
  });
  onBeforeUnmount(() => {
    observer?.disconnect();
    window.removeEventListener('scroll', schedule);
    window.removeEventListener('resize', schedule);
    preference?.removeEventListener('change', changePreference);
    cancelAnimationFrame(frame);
  });

  // RETURN
  return { elements: { stage } };
};
