<script setup lang="ts">
// -------------------- IMPORTS --------------------
import { ArrowUpRight, Check, MoveRight } from "@lucide/vue";
import ActionHeaderTA from "@/components/shared/ActionHeaderTA.vue";
import ButtonTA from "@/components/ButtonTA.vue";
import siteContent from "@/data/site-content.json";

// -------------------- PROPS/CONSTANTS/ROUTE/RUNTIME CONFIG --------------------
// -------------------- STATE --------------------
// -------------------- COMPOSABLES --------------------
// -------------------- STORE --------------------
// -------------------- COMPUTED --------------------
// -------------------- FUNCTIONS --------------------
// -------------------- WATCHERS --------------------
// -------------------- LIFECYCLE --------------------
</script>

<template>
  <div class="company-page">
    <section class="container section">
      <ActionHeaderTA
        eyebrow="FINANCIACIÓN"
        :title="'Tu próximo vehículo.\nA tu alcance.'"
        description="Explora las opciones de financiación de Automotores Andina y da el siguiente paso con acompañamiento."
      />
      <div class="company-finance-panel">
        <div class="company-finance-copy">
          <p class="eyebrow">DALE VÍA A LO QUE SIGUE</p>
          <h2>Un camino<br />a tu medida.</h2>
          <p>
            Consulta tu solicitud en la plataforma de financiación de
            Automotores Andina. Allí podrás conocer las alternativas disponibles
            para tu perfil.
          </p>
          <ButtonTA :href="siteContent.company.financingUrl" external
            >Explorar financiación <ArrowUpRight :size="17" /></ButtonTA
          ><small>Continuarás en automotoresandina.financiakarz.com</small>
        </div>
        <div class="company-finance-steps">
          <div>
            <span>01</span>
            <h3>Encuentra tu vehículo.</h3>
            <p>Elige el que quieres conocer en nuestro catálogo.</p>
            <RouterLink to="/catalogo" class="text-link"
              >Explorar catálogo <MoveRight :size="16"
            /></RouterLink>
          </div>
          <div>
            <span>02</span>
            <h3>Explora tus opciones.</h3>
            <p>
              Continúa en la plataforma de financiación para compartir la
              información de tu solicitud.
            </p>
          </div>
          <div>
            <span>03</span>
            <h3>Recibe acompañamiento.</h3>
            <p>
              Un asesor te orienta sobre el proceso y las condiciones que
              aplican a tu caso.
            </p>
          </div>
        </div>
      </div>
      <p class="company-finance-note">
        <Check :size="17" /> Las condiciones, tasas y aprobación dependen del
        estudio realizado por la entidad financiera.
      </p>
      <div class="company-bottom-cta">
        <div>
          <p class="eyebrow">¿PREFIERES HABLARLO?</p>
          <h2>Estamos a un mensaje.</h2>
        </div>
        <ButtonTA
          href="https://wa.me/573026606878?text=Hola%2C%20me%20interesa%20conocer%20las%20opciones%20de%20financiaci%C3%B3n."
          variant="secondary"
          >Hablar con un asesor <ArrowUpRight :size="16"
        /></ButtonTA>
      </div>
      <section class="finance-partners" aria-labelledby="finance-partners-title">
        <p class="eyebrow">RESPALDO ANDINA</p>
        <h2 id="finance-partners-title">Nuestros aliados.</h2>
        <div class="finance-partners-grid">
          <div v-for="(partner, index) in siteContent.partners" :key="partner" class="finance-partner">
            <img :src="partner" :alt="`Aliado de Automotores Andina ${index + 1}`" loading="lazy" width="160" height="80" />
          </div>
        </div>
      </section>
    </section>
  </div>
</template>

<style scoped src="@/modules/company/company.css"></style>

<style scoped>
.finance-partners { margin-top: 80px; padding-top: 52px; border-top: 1px solid #29292c; }
.finance-partners h2 { margin: 14px 0 30px; font-size: clamp(28px, 3vw, 40px); font-weight: 500; letter-spacing: -1.2px; }
.finance-partners-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 16px; }
.finance-partner { display: grid; place-items: center; min-height: 128px; padding: 24px; border-radius: 20px; background: #f5f5f7; }
.finance-partner img { width: 100%; max-width: 160px; height: 80px; object-fit: contain; }
@media (max-width: 640px) { .finance-partners { margin-top: 52px; padding-top: 36px; } .finance-partners-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; } .finance-partner { min-height: 104px; padding: 16px; } .finance-partner img { height: 64px; } }
</style>
