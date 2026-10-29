<script setup lang="ts">
// -------------------- IMPORTS --------------------
import { ArrowUpRight, Plus } from "@lucide/vue";
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
        eyebrow="PREGUNTAS FRECUENTES"
        :title="'Todo claro.\nDesde el inicio.'"
        description="Las respuestas que necesitas para comprar o vender con Automotores Andina."
      />
      <div class="company-faq-layout">
        <aside>
          <p class="eyebrow">ESTAMOS PARA AYUDARTE</p>
          <h2>Una buena decisión<br />empieza aquí.</h2>
          <p class="muted">
            Si necesitas más información, conversa directamente con nuestro
            equipo.
          </p>
          <ButtonTA href="https://wa.me/573026606878" variant="secondary"
            >Hablemos <ArrowUpRight :size="16"
          /></ButtonTA>
        </aside>
        <div class="company-faq-list">
          <details
            v-for="(faq, index) in siteContent.faqs"
            :key="faq.question"
            :open="index === 0"
            name="company-faq"
          >
            <summary>
              <span>{{ faq.question.trim() }}</span
              ><Plus :size="20" />
            </summary>
            <div class="company-faq-answer">
              <p>{{ faq.answer }}</p>
              <ul v-if="faq.list.length">
                <li v-for="item in faq.list" :key="item">{{ item }}</li>
              </ul>
              <p v-if="index === 0" class="company-source-note">
                Confirma la dirección y el horario de recepción con el asesor
                antes de tu visita.
              </p>
            </div>
          </details>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped src="@/modules/company/company.css"></style>
