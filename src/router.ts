import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/modules/home/HomeView.vue';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: HomeView, meta: { title: 'Tu próximo destino' } },
    { path: '/catalogo', component: () => import('@/modules/catalog/views/CatalogView.vue'), meta: { title: 'Catálogo de vehículos' } },
    { path: '/ficha_tecnica/:id', alias: '/vehiculo/:id', component: () => import('@/modules/catalog/views/VehicleDetailView.vue'), meta: { title: 'Conoce tu próximo vehículo' } },
    { path: '/vender', component: () => import('@/modules/company/views/SellView.vue'), meta: { title: 'Vende tu vehículo' } },
    { path: '/financiar', component: () => import('@/modules/company/views/FinanceView.vue'), meta: { title: 'Financia tu próximo destino' } },
    { path: '/servicios', component: () => import('@/modules/company/views/ServicesView.vue'), meta: { title: 'Servicios' } },
    { path: '/nosotros', component: () => import('@/modules/company/views/CompanyView.vue'), meta: { title: 'Nuestra historia' } },
    { path: '/preguntas', component: () => import('@/modules/company/views/FaqView.vue'), meta: { title: 'Preguntas frecuentes' } },
    { path: '/terminos_y_condiciones', component: () => import('@/modules/company/views/LegalView.vue'), meta: { title: 'Términos y condiciones' } },
    { path: '/autorizacion_datos_personales_igas', component: () => import('@/modules/company/views/LegalView.vue'), meta: { title: 'Autorización de datos personales' } },
    { path: '/solicitudcredito', redirect: '/financiar' },
    { path: '/politica_de_atencion_pqrs', redirect: '/preguntas' },
    { path: '/politica_de_privacidad', component: () => import('@/modules/company/views/LegalView.vue'), meta: { title: 'Política de privacidad' } },
    { path: '/:pathMatch(.*)*', component: () => import('@/modules/company/views/NotFoundView.vue'), meta: { title: 'Página no encontrada' } },
  ],
  scrollBehavior: (to, from, savedPosition) => savedPosition ?? (to.path === from.path && !to.hash ? undefined : to.hash ? { el: to.hash, top: 96 } : { top: 0 }),
});
router.afterEach((to) => { document.title = `${String(to.meta.title ?? 'Tu próximo destino')} | Automotores Andina`; });
