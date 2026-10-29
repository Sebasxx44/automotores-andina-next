<script setup lang="ts">
// -------------------- IMPORTS --------------------
import { ArrowUpRight, Check } from "@lucide/vue";
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
        eyebrow="SERVICIOS ANDINA"
        :title="'Nos encargamos.\nTú sigues adelante.'"
        description="Una red de trámites de tránsito a nivel nacional. El acompañamiento que necesitas, en cada paso."
      />
      <div class="company-assurances">
        <span><Check :size="16" /> Asesoría personalizada</span>
        <span><Check :size="16" /> Procesos transparentes</span>
        <span><Check :size="16" /> Cobertura nacional</span>
      </div>
      <div class="company-services-grid">
        <article
          v-for="(service, index) in siteContent.services"
          :key="service.title"
          class="company-service"
        >
          <div class="company-service-top">
            <span>0{{ index + 1 }}</span
            ><img :src="service.image" alt="" width="48" height="48" />
          </div>
          <h2>{{ service.title }}</h2>
          <p>{{ service.description }}</p>
          <a
            class="text-link"
            :href="`https://wa.me/573026606878?text=${encodeURIComponent(`Hola, me interesa recibir asesoría sobre ${service.title.toLowerCase()}.`)}`"
            target="_blank"
            rel="noopener noreferrer"
            >Consultar con un asesor <ArrowUpRight :size="16"
          /></a>
        </article>
      </div>
      <div class="company-bottom-cta">
        <div>
          <p class="eyebrow">SIEMPRE CERCA</p>
          <h2>El siguiente paso, juntos.</h2>
        </div>
        <ButtonTA to="/nosotros#sedes" variant="secondary"
          >Encuentra tu sede <ArrowUpRight :size="16"
        /></ButtonTA>
      </div>
    </section>
  </div>
</template>

<style scoped src="@/modules/company/company.css"></style>
