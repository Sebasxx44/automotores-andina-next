// -------------------- IMPORTS --------------------
import { afterEach, describe, expect, it, vi } from "vitest";
import { useSellVehicle } from "@/modules/company/composables/useSellVehicle";
import type { SellVehicleReturn } from "@/modules/company/types";

// -------------------- FUNCTIONS --------------------
const fillValidForm = (form: SellVehicleReturn["form"]): void => {
  Object.assign(form, {
    name: "María Pérez",
    phone: "+57 300 123 4567",
    vehicle: "Toyota Corolla Cross XEI",
    year: "2022",
    mileage: "45000",
    consent: true,
  });
};

// -------------------- TESTS --------------------
afterEach(() => vi.unstubAllGlobals());

describe("useSellVehicle", () => {
  it("prepares the original contact number and vehicle details without submitting a backend request", () => {
    const open = vi.fn();
    vi.stubGlobal("window", { open });
    const { form, contact, validations } = useSellVehicle();
    fillValidForm(form);

    contact.submit();

    expect(validations.error.value).toBe("");
    expect(open).toHaveBeenCalledOnce();
    const target = new URL(contact.whatsappUrl.value);
    expect(target.origin + target.pathname).toBe("https://wa.me/573026606878");
    expect(target.searchParams.get("text")).toContain("María Pérez");
    expect(target.searchParams.get("text")).toContain(
      "Toyota Corolla Cross XEI",
    );
    expect(target.searchParams.get("text")).toContain("45000 km");
    expect(open).toHaveBeenCalledWith(
      contact.whatsappUrl.value,
      "_blank",
      "noopener,noreferrer",
    );
  });

  it("requires consent before opening a conversation", () => {
    const open = vi.fn();
    vi.stubGlobal("window", { open });
    const { form, contact, validations } = useSellVehicle();
    fillValidForm(form);
    form.consent = false;

    contact.submit();

    expect(open).not.toHaveBeenCalled();
    expect(validations.error.value).toContain("autorización");
    expect(contact.sent.value).toBe(false);
  });

  it.each([
    { field: "year" as const, value: "2009", message: "modelo" },
    { field: "year" as const, value: "2022.5", message: "modelo" },
    { field: "mileage" as const, value: "100001", message: "kilometraje" },
    { field: "mileage" as const, value: "-1", message: "kilometraje" },
    { field: "phone" as const, value: "123", message: "teléfono" },
    { field: "name" as const, value: "  ", message: "nombre" },
  ])(
    "rejects invalid $field before sharing contact data",
    ({ field, value, message }) => {
      const open = vi.fn();
      vi.stubGlobal("window", { open });
      const { form, contact, validations } = useSellVehicle();
      fillValidForm(form);
      form[field] = value;

      contact.submit();

      expect(open).not.toHaveBeenCalled();
      expect(validations.error.value).toContain(message);
    },
  );
});
