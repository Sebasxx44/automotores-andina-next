import type { Ref } from 'vue';

export interface NavigationState {
  menuOpen: Ref<boolean>;
  toggleMenu: () => void;
  closeMenu: () => void;
}
export interface NavigationReturn { navigation: NavigationState }
