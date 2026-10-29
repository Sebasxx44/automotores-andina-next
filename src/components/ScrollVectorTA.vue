<template>
  <div :ref="elements.container" class="scroll-vector" aria-hidden="true">
    <svg
      class="scroll-vector__drawing"
      viewBox="0 0 1280 280"
      fill="none"
      preserveAspectRatio="none"
      focusable="false"
    >
      <g class="scroll-vector__lanes">
        <path
          d="M -80 276 C 160 266 230 290 390 246 S 575 122 748 136 S 1024 252 1370 44"
        />
        <path
          d="M -80 236 C 160 226 230 250 390 206 S 575 82 748 96 S 1024 212 1370 4"
        />
      </g>
      <path
        :ref="elements.path"
        class="scroll-vector__route"
        d="M -80 256 C 160 246 230 270 390 226 S 575 102 748 116 S 1024 232 1370 24"
      />
      <path
        class="scroll-vector__progress"
        :class="{ 'scroll-vector__progress--static': motion.reduced.value }"
        d="M -80 256 C 160 246 230 270 390 226 S 575 102 748 116 S 1024 232 1370 24"
        pathLength="100"
        stroke-dasharray="100"
        :stroke-dashoffset="motion.dashOffset.value"
      />
      <g
        v-for="(point, index) in motion.landmarks.value"
        :key="index"
        class="scroll-vector__landmark"
        :transform="`translate(${point.x} ${point.y})`"
      >
        <circle r="3.5" />
        <path d="M 0 -16 V -11 M 0 11 V 16" />
      </g>
      <circle
        class="scroll-vector__marker-edge"
        :cx="motion.marker.value.x"
        :cy="motion.marker.value.y"
        r="7.5"
      />
      <circle
        class="scroll-vector__marker"
        :cx="motion.marker.value.x"
        :cy="motion.marker.value.y"
        r="3"
      />
    </svg>
  </div>
</template>

<script setup lang="ts">
// IMPORTS
import { useScrollVector } from "@/composables/scroll-vector/useScrollVector";
// PROPS/CONSTANTS/ROUTE/RUNTIME CONFIG
// STATE (refs/reactive)
// COMPOSABLES(useX)
const { elements, motion } = useScrollVector();
// STORE
// COMPUTED
// FUNCTIONS
// WATCHERS
// LIFECYCLE
</script>

<style scoped>
.scroll-vector {
  width: 100%;
  height: var(--scroll-vector-height, clamp(210px, 24vw, 280px));
  overflow: hidden;
  pointer-events: none;
  user-select: none;
  contain: layout paint;
}
.scroll-vector__drawing {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}
.scroll-vector__drawing path,
.scroll-vector__drawing circle {
  vector-effect: non-scaling-stroke;
}
.scroll-vector__lanes {
  stroke: #333336;
  stroke-width: 0.75;
  opacity: 0.5;
}
.scroll-vector__route {
  stroke: #333336;
  stroke-width: 1;
  opacity: 0.65;
}
.scroll-vector__progress {
  stroke: #2997ff;
  stroke-width: 1;
  stroke-linecap: round;
  opacity: 0.4;
  transition: stroke-dashoffset 180ms linear;
}
.scroll-vector__landmark {
  stroke: #6e6e73;
  stroke-width: 0.8;
  opacity: 0.7;
}
.scroll-vector__landmark circle {
  fill: #000;
}
.scroll-vector__marker {
  fill: #2997ff;
  opacity: 0.9;
}
.scroll-vector__marker-edge {
  stroke: #2997ff;
  stroke-width: 0.75;
  fill: #000;
  opacity: 0.55;
}
.scroll-vector__marker,
.scroll-vector__marker-edge {
  transition:
    cx 180ms linear,
    cy 180ms linear;
}
@media (max-width: 700px) {
  .scroll-vector__lanes {
    opacity: 0.35;
  }
}
@media (prefers-reduced-motion: reduce) {
  .scroll-vector__progress,
  .scroll-vector__marker,
  .scroll-vector__marker-edge {
    transition: none;
  }
}
</style>
