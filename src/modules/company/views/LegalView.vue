<script setup lang="ts">
// -------------------- IMPORTS --------------------
import { ArrowUpRight } from "@lucide/vue";
import ActionHeaderTA from "@/components/shared/ActionHeaderTA.vue";
import { useLegalDocument } from "@/modules/company/composables/useLegalDocument";

// -------------------- COMPOSABLES --------------------
const { document } = useLegalDocument();
</script>

<template>
  <div class="company-page">
    <section class="container section">
      <ActionHeaderTA
        eyebrow="INFORMACIÓN LEGAL"
        :title="document.title.value"
        :description="document.description.value"
        compact
      />
      <div class="company-legal-layout">
        <aside class="company-legal-nav">
          <RouterLink to="/terminos_y_condiciones"
            >Términos y condiciones</RouterLink
          ><RouterLink to="/politica_de_privacidad"
            >Política de privacidad</RouterLink
          ><a
            :href="document.source.value"
            target="_blank"
            rel="noopener noreferrer"
            >Consultar texto original <ArrowUpRight :size="15"
          /></a>
        </aside>
        <article class="company-legal-copy">
          <template
            v-for="(block, index) in document.blocks.value"
            :key="`${document.title.value}-${index}`"
            ><h2 v-if="block.type === 'heading'">{{ block.text }}</h2>
            <p
              v-else
              :class="{ 'company-legal-list-item': block.type === 'list' }"
            >
              {{ block.text }}
            </p></template
          >
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped src="@/modules/company/company.css"></style>
