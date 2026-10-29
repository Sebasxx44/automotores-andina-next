<script setup lang="ts">
// -------------------- IMPORTS --------------------
import { ArrowUpRight, MapPin, Phone, Play } from "@lucide/vue";
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
        eyebrow="SOMOS AUTOMOTORES ANDINA"
        title="Más que un vehículo. Una experiencia de vida."
        description="Una familia. Una pasión compartida. Más de 11 años conectando personas con su próximo vehículo en el Eje Cafetero."
        ><template #actions
          ><ButtonTA to="#sedes" variant="secondary"
            >Visítanos <ArrowUpRight :size="16" /></ButtonTA></template
      ></ActionHeaderTA>
      <figure class="company-hero-image">
        <img
          :src="siteContent.about.image"
          alt="Vitrina y vehículos de Automotores Andina en Pereira"
          fetchpriority="high"
        />
        <figcaption>
          <span>PEREIRA, RISARALDA</span
          ><a
            :href="siteContent.about.video"
            target="_blank"
            rel="noopener noreferrer"
            ><Play :size="15" /> Nuestra historia en video</a
          >
        </figcaption>
      </figure>
      <div class="company-history">
        <div>
          <p class="eyebrow">EL ORIGEN DE TODO</p>
          <h2>Los grandes caminos<br />empiezan con un sueño.</h2>
        </div>
        <div>
          <p class="company-intro">{{ siteContent.about.intro }}</p>
          <p v-for="paragraph in siteContent.about.history" :key="paragraph">
            {{ paragraph }}
          </p>
        </div>
      </div>
    </section>
    <section class="company-team-section section">
      <div class="container">
        <div class="company-section-heading">
          <div>
            <p class="eyebrow">EL EQUIPO ANDINA</p>
            <h2>Personas que<br />mueven historias.</h2>
          </div>
          <p class="muted">
            Conoce a quienes te acompañan<br />en cada parte del camino.
          </p>
        </div>
        <div class="company-team-grid">
          <article
            v-for="person in siteContent.team"
            :key="person.name"
            class="company-team-member"
          >
            <img
              :src="person.image"
              :alt="person.name"
              loading="lazy"
              width="400"
              height="480"
            />
            <h3>{{ person.name }}</h3>
            <p>{{ person.role }}</p>
          </article>
        </div>
      </div>
    </section>
    <section id="sedes" class="container section">
      <div class="company-section-heading">
        <div>
          <p class="eyebrow">ENCUÉNTRANOS EN PEREIRA</p>
          <h2>Tu siguiente parada.</h2>
        </div>
        <div class="company-hours">
          <p>{{ siteContent.company.hours.weekdays }}</p>
          <p>{{ siteContent.company.hours.saturday }}</p>
          <p>{{ siteContent.company.hours.sunday }}</p>
        </div>
      </div>
      <div class="company-locations-grid">
        <article
          v-for="(location, index) in siteContent.locations"
          :key="location.name"
          class="company-location"
        >
          <span class="company-location-number">0{{ index + 1 }}</span>
          <h3>{{ index === 0 ? "Sede principal" : location.name }}</h3>
          <p>
            <MapPin :size="16" />{{ location.address }}<br />{{ location.city }}
          </p>
          <a :href="`tel:+57${location.phone}`"
            ><Phone :size="15" />{{ location.phone }}</a
          ><a
            :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${location.address}, ${location.city}, Colombia`)}`"
            target="_blank"
            rel="noopener noreferrer"
            class="text-link"
            >Cómo llegar <ArrowUpRight :size="16"
          /></a>
        </article>
      </div>
      <div class="company-bottom-cta">
        <div>
          <p class="eyebrow">SIGAMOS CONVERSANDO</p>
          <h2>Tu próxima historia comienza aquí.</h2>
        </div>
        <ButtonTA href="https://wa.me/573026606878" external
          >Hablemos <ArrowUpRight :size="16"
        /></ButtonTA>
      </div>
    </section>
  </div>
</template>

<style scoped src="@/modules/company/company.css"></style>
