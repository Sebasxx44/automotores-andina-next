// -------------------- IMPORTS --------------------
import { computed } from "vue";
import { useRoute } from "vue-router";
import siteContent from "@/data/site-content.json";
import type { LegalDocumentReturn } from "@/modules/company/types";

// -------------------- COMPOSABLE --------------------
export const useLegalDocument = (): LegalDocumentReturn => {
  // -------------------- ROUTE --------------------
  const route = useRoute();

  // -------------------- COMPUTED --------------------
  const isPrivacy = computed(() => route.path.includes("privacidad"));
  const isAuthorization = computed(() => route.path.includes("autorizacion"));
  const title = computed(() =>
    isAuthorization.value
      ? "Autorización de datos personales."
      : isPrivacy.value
        ? "Política de privacidad."
        : "Términos y condiciones.",
  );
  const description = computed(() =>
    isAuthorization.value
      ? "Autorización para la recolección y el tratamiento de datos personales."
      : isPrivacy.value
        ? "Tratamiento de datos personales de Automotores Andina."
        : "Comunicaciones y ventas por WhatsApp de Automotores Andina.",
  );
  const blocks = computed(() =>
    isAuthorization.value
      ? siteContent.legal.authorization
      : isPrivacy.value
        ? siteContent.legal.privacy
        : siteContent.legal.terms,
  );
  const source = computed(
    () =>
      `https://www.automotoresandina.com.co/${
        isAuthorization.value
          ? "autorizacion_datos_personales_igas"
          : isPrivacy.value
            ? "politica_de_privacidad"
            : "terminos_y_condiciones"
      }`,
  );

  // -------------------- RETURN --------------------
  return { document: { title, description, blocks, source } };
};
