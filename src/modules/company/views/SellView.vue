<script setup lang="ts">
// -------------------- IMPORTS --------------------
import { ArrowUpRight, Check, MessageCircle } from "@lucide/vue";
import ActionHeaderTA from "@/components/shared/ActionHeaderTA.vue";
import ButtonTA from "@/components/ButtonTA.vue";
import siteContent from "@/data/site-content.json";
import { useSellVehicle } from "@/modules/company/composables/useSellVehicle";

// -------------------- COMPOSABLES --------------------
const { form, validations, contact } = useSellVehicle();
</script>

<template>
  <div class="company-page">
    <section class="container section">
      <ActionHeaderTA
        eyebrow="VENDE CON ANDINA"
        :title="'Una nueva ruta\npara tu vehículo.'"
        description="Cuéntanos qué conduces. Te acompañamos para encontrar a su próximo dueño."
      />
      <div class="company-sell-layout">
        <aside class="company-sell-story">
          <img
            :src="siteContent.about.image"
            alt="Instalaciones de Automotores Andina en Pereira"
            class="company-sell-image"
          />
          <h2>Tu carro. Nuestro respaldo.</h2>
          <p class="muted">
            Intermediación o consignación. Un equipo que te acompaña desde la
            valoración hasta el cierre.
          </p>
          <ul class="company-requirements">
            <li
              v-for="requirement in siteContent.sellRequirements"
              :key="requirement"
            >
              <Check :size="18" />{{ requirement }}
            </li>
          </ul>
          <RouterLink to="/preguntas" class="text-link"
            >Conoce cómo funciona <ArrowUpRight :size="16"
          /></RouterLink>
        </aside>
        <form class="company-form" @submit.prevent="contact.submit">
          <p class="eyebrow">EMPECEMOS POR LO ESENCIAL</p>
          <h2>Hablemos de tu vehículo.</h2>
          <div class="company-field">
            <label for="seller-name">Nombre completo</label
            ><input
              id="seller-name"
              v-model="form.name"
              name="name"
              autocomplete="name"
              placeholder="Tu nombre"
              required
              minlength="2"
              maxlength="100"
            />
          </div>
          <div class="company-field">
            <label for="seller-phone">Celular</label
            ><input
              id="seller-phone"
              v-model="form.phone"
              name="phone"
              autocomplete="tel"
              type="tel"
              inputmode="tel"
              placeholder="300 000 0000"
              required
              maxlength="20"
            />
          </div>
          <div class="company-field">
            <label for="seller-vehicle">Marca, línea y versión</label
            ><input
              id="seller-vehicle"
              v-model="form.vehicle"
              name="vehicle"
              placeholder="Ej. Toyota Corolla Cross XEI"
              required
              minlength="3"
              maxlength="120"
            />
          </div>
          <div class="company-form-row">
            <div class="company-field">
              <label for="seller-year">Modelo / año</label
              ><input
                id="seller-year"
                v-model="form.year"
                name="year"
                type="number"
                inputmode="numeric"
                placeholder="2022"
                :min="validations.minimumYear"
                :max="validations.maximumYear"
                required
              />
            </div>
            <div class="company-field">
              <label for="seller-mileage">Kilometraje</label
              ><input
                id="seller-mileage"
                v-model="form.mileage"
                name="mileage"
                type="number"
                inputmode="numeric"
                placeholder="45000"
                min="0"
                :max="validations.maximumMileage"
                required
              /><span class="company-field-hint">Máximo 100.000 km</span>
            </div>
          </div>
          <label class="company-consent"
            ><input v-model="form.consent" type="checkbox" required /><span
              >Confirmo que el vehículo no es blindado y autorizo el contacto
              para esta solicitud. He leído la
              <RouterLink to="/politica_de_privacidad"
                >política de privacidad</RouterLink
              >.</span
            ></label
          >
          <p
            v-if="validations.error.value"
            class="company-form-error"
            role="alert"
          >
            {{ validations.error.value }}
          </p>
          <ButtonTA type="submit"
            >Continuar por WhatsApp <MessageCircle :size="17"
          /></ButtonTA>
          <p class="company-form-disclosure">
            Se abrirá WhatsApp con tus datos. Revisa el mensaje y envíalo para
            iniciar la conversación con un asesor.
          </p>
          <p
            v-if="contact.sent.value"
            class="company-form-feedback"
            role="status"
          >
            Continúa en WhatsApp para enviar tu solicitud.
            <a
              :href="contact.whatsappUrl.value"
              target="_blank"
              rel="noopener noreferrer"
              >Abrir conversación <ArrowUpRight :size="14"
            /></a>
          </p>
        </form>
      </div>
    </section>
  </div>
</template>

<style scoped src="@/modules/company/company.css"></style>
