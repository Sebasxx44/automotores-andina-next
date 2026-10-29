// -------------------- IMPORTS --------------------
import type { ComputedRef, Ref } from "vue";

// -------------------- TYPES --------------------
export interface SellForm {
  name: string;
  phone: string;
  vehicle: string;
  year: string;
  mileage: string;
  consent: boolean;
}

export interface SellVehicleReturn {
  form: SellForm;
  validations: {
    minimumYear: number;
    maximumYear: number;
    maximumMileage: number;
    error: Ref<string>;
  };
  contact: {
    sent: Ref<boolean>;
    whatsappUrl: ComputedRef<string>;
    submit: () => void;
  };
}

export interface LegalBlock {
  type: string;
  text: string;
}

export interface LegalDocumentReturn {
  document: {
    title: ComputedRef<string>;
    description: ComputedRef<string>;
    blocks: ComputedRef<LegalBlock[]>;
    source: ComputedRef<string>;
  };
}
