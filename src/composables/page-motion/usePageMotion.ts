// IMPORTS
import { onBeforeUnmount, onMounted, ref } from 'vue';
import type { PageMotionReturn } from '@/composables/page-motion/types';

export const usePageMotion = (): PageMotionReturn => {
  // PROPS/CONSTANTS/ROUTE/RUNTIME CONFIG
  const targets = [
    '.hero-kicker', '.hero-intro > p', '.action-header', '.section-heading',
    '.discovery-section', '.vehicle-card', '.ownership-image', '.ownership-copy',
    '.experience-card', '.story-inner > div', '.community-reviews > figure',
    '.reviews-source', '.closing-section > .eyebrow', '.closing-section > h2',
    '.closing-section > .closing-actions', '.company-section-heading',
    '.company-history > div', '.company-team-member', '.company-location',
    '.company-service', '.company-bottom-cta', '.company-hero-image',
    '.catalog-filters', '.catalog-assistance', '.detail-layout',
    '.detail-specifications > div', '.detail-specifications dl', '.detail-features',
  ].join(',');

  // STATE (refs/reactive)
  const root = ref<HTMLElement | null>(null);
  let observer: IntersectionObserver | null = null;
  let mutations: MutationObserver | null = null;
  let preference: MediaQueryList | null = null;
  let frame = 0;
  const registered = new WeakSet<Element>();
  const pendingTargets = new Set<Element>();

  // COMPOSABLES(useX)
  // STORE
  // COMPUTED
  // FUNCTIONS
  const registerElements = (): void => {
    frame = 0;
    if (!root.value || !observer) return;
    pendingTargets.forEach((element) => {
      if (root.value?.contains(element)) return;
      observer?.unobserve(element);
      pendingTargets.delete(element);
      registered.delete(element);
    });
    if (preference?.matches) return;
    root.value.querySelectorAll<HTMLElement>(targets).forEach((element) => {
      if (registered.has(element)) return;
      registered.add(element);
      const siblings = element.parentElement ? [...element.parentElement.children].filter((child) => child.matches(targets)) : [];
      element.style.setProperty('--motion-delay', `${Math.min(Math.max(siblings.indexOf(element), 0), 3) * 65}ms`);
      pendingTargets.add(element);
      observer?.observe(element);
    });
  };
  const scheduleRegistration = (): void => {
    if (!frame) frame = requestAnimationFrame(registerElements);
  };
  const updatePreference = (): void => {
    if (preference?.matches) {
      root.value?.querySelectorAll('.motion-enter').forEach((element) => element.classList.remove('motion-enter'));
      return;
    }
    scheduleRegistration();
  };

  // WATCHERS
  // LIFECYCLE
  onMounted(() => {
    if (!('IntersectionObserver' in window)) return;
    preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        if (!preference?.matches) entry.target.classList.add('motion-enter');
        observer?.unobserve(entry.target);
        pendingTargets.delete(entry.target);
      });
    }, { rootMargin: '0px 0px 160px 0px', threshold: 0 });
    mutations = new MutationObserver(scheduleRegistration);
    if (root.value) mutations.observe(root.value, { childList: true, subtree: true });
    preference.addEventListener('change', updatePreference);
    scheduleRegistration();
  });
  onBeforeUnmount(() => {
    observer?.disconnect();
    pendingTargets.clear();
    mutations?.disconnect();
    preference?.removeEventListener('change', updatePreference);
    cancelAnimationFrame(frame);
  });

  // RETURN
  return { elements: { root } };
};
