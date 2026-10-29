// -------------------- IMPORTS --------------------
import { computed, reactive, ref } from "vue";
import type { SellForm, SellVehicleReturn } from "@/modules/company/types";

// -------------------- CONSTANTS --------------------
const MINIMUM_YEAR = 2010;
const MAXIMUM_MILEAGE = 100000;
const CONTACT_NUMBER = "573026606878";

// -------------------- COMPOSABLE --------------------
export const useSellVehicle = (): SellVehicleReturn => {
  // -------------------- STATE --------------------
  const form = reactive<SellForm>({
    name: "",
    phone: "",
    vehicle: "",
    year: "",
    mileage: "",
    consent: false,
  });
  const error = ref("");
  const sent = ref(false);
  const maximumYear = new Date().getFullYear() + 1;

  // -------------------- COMPUTED --------------------
  const whatsappUrl = computed(() => {
    const message = [
      "Hola, Automotores Andina. Me interesa vender mi vehículo.",
      `Nombre: ${form.name.trim()}`,
      `Teléfono: ${form.phone.trim()}`,
      `Vehículo: ${form.vehicle.trim()}`,
      `Modelo: ${form.year}`,
      `Kilometraje: ${form.mileage} km`,
      "Confirmo que el vehículo no es blindado y autorizo el contacto para esta solicitud.",
    ].join("\n");
    return `https://wa.me/${CONTACT_NUMBER}?text=${encodeURIComponent(message)}`;
  });

  // -------------------- FUNCTIONS --------------------
  const submit = (): void => {
    error.value = "";
    const phone = form.phone.replace(/[\s()+-]/g, "");
    const year = Number(form.year);
    const mileage = Number(form.mileage);

    if (form.name.trim().length < 2 || form.vehicle.trim().length < 3) {
      error.value =
        "Completa tu nombre y la marca, línea o versión del vehículo.";
      return;
    }
    if (!/^\d{10,15}$/.test(phone)) {
      error.value = "Ingresa un teléfono válido de 10 a 15 dígitos.";
      return;
    }
    if (!Number.isInteger(year) || year < MINIMUM_YEAR || year > maximumYear) {
      error.value = `El modelo debe estar entre ${MINIMUM_YEAR} y ${maximumYear}.`;
      return;
    }
    if (
      !form.mileage ||
      !Number.isInteger(mileage) ||
      mileage < 0 ||
      mileage > MAXIMUM_MILEAGE
    ) {
      error.value = "El kilometraje debe estar entre 0 y 100.000 km.";
      return;
    }
    if (!form.consent) {
      error.value = "Acepta la autorización de contacto antes de continuar.";
      return;
    }
    sent.value = true;
    window.open(whatsappUrl.value, "_blank", "noopener,noreferrer");
  };

  // -------------------- RETURN --------------------
  return {
    form,
    validations: {
      minimumYear: MINIMUM_YEAR,
      maximumYear,
      maximumMileage: MAXIMUM_MILEAGE,
      error,
    },
    contact: { sent, whatsappUrl, submit },
  };
};
