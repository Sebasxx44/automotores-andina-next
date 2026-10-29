// IMPORTS
import { describe, expect, it } from 'vitest';
import { getCarouselRange, getPageForIndex, getSwipeDirection, getVisibleItems } from '@/composables/carousel/useCarousel';

// PROPS/CONSTANTS/ROUTE/RUNTIME CONFIG
const deliveryLayout = { desktopItems: 3, tabletItems: 2, mobileItems: 1 };

// TESTS
describe('navegación del carrusel', () => {
  it('muestra la última entrega sin dejar huecos ni salir del inventario', () => {
    const lastPage = getCarouselRange(11, 3, 3);
    expect(lastPage).toEqual({ page: 3, totalPages: 4, firstIndex: 8, lastIndex: 10 });
    expect(getCarouselRange(11, 3, 50)).toEqual(lastPage);
    expect(getCarouselRange(11, 3, -1).firstIndex).toBe(0);
  });

  it('no habilita páginas adicionales con menos imágenes que espacios', () => {
    expect(getCarouselRange(2, 5, 4)).toEqual({ page: 0, totalPages: 1, firstIndex: 0, lastIndex: 1 });
    expect(getCarouselRange(0, 3, 4)).toEqual({ page: 0, totalPages: 1, firstIndex: 0, lastIndex: -1 });
  });

  it('adapta entregas a tres, dos y una imagen según el ancho', () => {
    expect(getVisibleItems(1440, deliveryLayout)).toBe(3);
    expect(getVisibleItems(900, deliveryLayout)).toBe(2);
    expect(getVisibleItems(390, deliveryLayout)).toBe(1);
  });

  it('mantiene la miniatura seleccionada dentro de la página tras cambiar el ancho', () => {
    const selected = 8;
    const desktop = getCarouselRange(14, 5, getPageForIndex(selected, 14, 5));
    const mobile = getCarouselRange(14, 3, getPageForIndex(selected, 14, 3));
    expect(desktop.firstIndex).toBeLessThanOrEqual(selected);
    expect(desktop.lastIndex).toBeGreaterThanOrEqual(selected);
    expect(mobile.firstIndex).toBeLessThanOrEqual(selected);
    expect(mobile.lastIndex).toBeGreaterThanOrEqual(selected);
    expect(getPageForIndex(30, 14, 3)).toBe(4);
  });

  it('ignora movimientos verticales y toques cortos para permitir el scroll de página', () => {
    expect(getSwipeDirection({ x: 100, y: 100 }, { x: 80, y: 240 })).toBe(0);
    expect(getSwipeDirection({ x: 100, y: 100 }, { x: 70, y: 105 })).toBe(0);
    expect(getSwipeDirection({ x: 100, y: 100 }, { x: 40, y: 165 })).toBe(0);
  });

  it('reconoce un swipe horizontal en ambas direcciones', () => {
    expect(getSwipeDirection({ x: 200, y: 100 }, { x: 100, y: 110 })).toBe(1);
    expect(getSwipeDirection({ x: 100, y: 100 }, { x: 200, y: 110 })).toBe(-1);
  });
});
