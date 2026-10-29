<script setup lang="ts">
// -------------------- IMPORTS --------------------
import { ArrowRight } from "@lucide/vue";
import ActionHeaderTA from "@/components/shared/ActionHeaderTA.vue";
import ButtonTA from "@/components/ButtonTA.vue";

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
    <section class="container section company-not-found">
      <span class="company-404" aria-hidden="true">404</span
      ><ActionHeaderTA
        eyebrow="TOMAMOS OTRO CAMINO"
        title="Esta ruta no existe."
        description="Pero tu próximo vehículo puede estar más cerca de lo que imaginas."
        compact
        ><template #actions
          ><ButtonTA to="/catalogo"
            >Explorar vehículos <ArrowRight :size="17" /></ButtonTA
          ><ButtonTA to="/" variant="secondary"
            >Volver al inicio</ButtonTA
          ></template
        ></ActionHeaderTA
      >
    </section>
  </div>
</template>

<style scoped src="@/modules/company/company.css"></style>
