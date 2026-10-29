// IMPORTS
import { ref, watch, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';
import type { NavigationReturn } from '@/composables/types';

export const useNavigation = (): NavigationReturn => {
  // PROPS/CONSTANTS/ROUTE/RUNTIME CONFIG
  const route = useRoute();
  // STATE (refs/reactive)
  const menuOpen = ref(false);
  // COMPOSABLES(useX)
  // STORE
  // COMPUTED
  // FUNCTIONS
  const toggleMenu = () => { menuOpen.value = !menuOpen.value; };
  const closeMenu = () => { menuOpen.value = false; };
  // WATCHERS
  watch(() => route.fullPath, closeMenu);
  watch(menuOpen, (open) => { document.body.style.overflow = open ? 'hidden' : ''; });
  // LIFECYCLE
  onUnmounted(() => { document.body.style.overflow = ''; });
  // RETURN
  return { navigation: { menuOpen, toggleMenu, closeMenu } };
};
