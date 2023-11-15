import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { J5VInput } from "../../lib/main";
import { VueNode } from "@vue/test-utils/dist/types";

const symbolDecimal = (1.1).toLocaleString().replace(/\d/g, "");
const numberNormalizate = (number: string) =>
  number.replace(".", symbolDecimal);

describe("J5VInput component", async () => {
  describe("Test en general", async () => {
    it("El componente monta con default", () => {
      expect(J5VInput).toBeTruthy();
      const wrapper = mount(J5VInput);
      const input = wrapper.find(".j5v-input input");
      expect(input.exists()).toBeTruthy();
      expect(input.attributes().placeholder).toBe("");
      expect(input.attributes().type).toBe("text");
      expect(input.attributes().inputmode).toBe("text");
      expect(input.attributes().name).toBe("");
      expect(input.attributes().disabled).toBeUndefined();
      expect(input.attributes().required).toBeUndefined();
      wrapper.unmount();
    });

    it("El componente no tiene la prop name", () => {
      const wrapper = mount(J5VInput, {
        props: {
          type: "symbol",
        },
      });
      expect(wrapper.find(".j5v-input input").attributes().inputmode).toBe(
        "none"
      );
    });

    it("El componente monta con props", () => {
      const wrapper = mount(J5VInput, {
        attachTo: "body",
        props: {
          initialValue: "Initial Value",
          placeholder: "Placeholder",
          type: "email",
          name: "name",
          disabled: true,
          required: true,
          hasFocus: true,
        },
      });
      const input = wrapper.find(".j5v-input input");
      expect(input.attributes().placeholder).toBe("Placeholder");
      expect(input.attributes().type).toBe("text");
      expect(input.attributes().inputmode).toBe("email");
      expect(input.attributes().name).toBe("name");
      expect(input.attributes().disabled).toBe("");
      expect(input.attributes().required).toBe("");
      const inputElement = input.element as VueNode<HTMLInputElement>;
      expect(inputElement.value).toBe("Initial Value");
      wrapper.unmount();
    });

    it("El componente se actualiza la prop modelValue (v-model)", async () => {
      const wrapper = mount(J5VInput, {
        props: {
          modelValue: "Initial Value",
        },
      });

      let inputElement = wrapper.find(".j5v-input input")
        .element as VueNode<HTMLInputElement>;
      expect(inputElement.value).toBe("Initial Value");

      await wrapper.setProps({
        modelValue: "New Value",
      });

      inputElement = wrapper.find(".j5v-input input")
        .element as VueNode<HTMLInputElement>;
      expect(inputElement.value).toBe("New Value");
    });
  });

  describe("Test input Text", async () => {
    it("Input-text: Enviando props", async () => {
      const wrapper = mount(J5VInput, {
        props: {
          type: "text",
          placeholder: "text",
          required: true,
          hasInputEvent: true,
        },
      });
      const input = wrapper.find(".j5v-input > input");
      await input.setValue("J");
      let inputValue = wrapper.find(".j5v-input > input")
        .element as VueNode<HTMLInputElement>;
      expect(input.attributes().placeholder).toBe("text");
      expect(input.attributes().type).toBe("text");
      expect(input.attributes().inputmode).toBe("text");
      expect(inputValue.value).toBe("J");
    });

    it("Input-text: emitir evento update:modelValue", async () => {
      const wrapper = mount(J5VInput, {
        props: {
          type: "text",
        },
      });
      const input = wrapper.find(".j5v-input > input");
      await input.setValue("J");
      expect(wrapper.emitted()["update:modelValue"][0]).toStrictEqual(["J"]);
    });

    it("Input-text: probando validador con evento input", async () => {
      const wrapper = mount(J5VInput, {
        props: {
          type: "text",
          placeholder: "text",
          required: true,
          hasInputEvent: true,
        },
      });
      const input = wrapper.find(".j5v-input > input");
      await input.setValue("");
      const labelError = wrapper.find(".j5v-label-error");
      expect(labelError.exists()).toBeTruthy();
      expect(labelError.text()).toBe("text incorrecto");

      await input.setValue("Texto demo");
      expect(wrapper.find(".j5v-label-error").exists()).toBeFalsy();
    });

    it("Input-text: valor inicial para input", async () => {
      const wrapper = mount(J5VInput, {
        props: {
          modelValue: "Texto demo",
        },
      });

      const inputValue = wrapper.find(".j5v-input > input")
        .element as VueNode<HTMLInputElement>;
      expect(inputValue.value).toBe("Texto demo");
    });
  });

  describe("Test input email", async () => {
    it("Input-email: Validando atributos al montar", async () => {
      const wrapper = mount(J5VInput, {
        props: {
          type: "email",
        },
      });

      expect(wrapper.find(".j5v-input input").attributes().type).toBe("text");
      expect(wrapper.find(".j5v-input input").attributes().inputmode).toBe(
        "email"
      );
    });
    it("Input-email:Validando validador con evento blur", async () => {
      const wrapper = mount(J5VInput, {
        props: {
          type: "email",
          hasBlurEvent: true,
        },
      });
      await wrapper.find(".j5v-input input").setValue("emailTest");
      await wrapper.find(".j5v-input input").trigger("blur");
      expect(wrapper.find(".j5v-label-error").exists()).toBeTruthy();

      await wrapper.find(".j5v-input input").setValue("emailTest@test.com");
      await wrapper.find(".j5v-input input").trigger("blur");
      expect(wrapper.find(".j5v-label-error").exists()).toBeFalsy();
    });
  });

  describe("Test input tipo tel", async () => {
    it("Input-tel: Validando atributos al montar", async () => {
      const wrapper = mount(J5VInput, {
        props: {
          type: "tel",
        },
      });
      expect(wrapper.find(".j5v-input input").attributes().type).toBe("text");
      expect(wrapper.find(".j5v-input input").attributes().inputmode).toBe(
        "tel"
      );
    });

    it("Input-tel: Validando validador con evento focus", async () => {
      const wrapper = mount(J5VInput, {
        props: {
          type: "tel",
          hasFocusEvent: true,
        },
      });

      await wrapper.find(".j5v-input input").trigger("focus");
      expect(wrapper.find(".j5v-label-error").exists()).toBeTruthy();

      await wrapper.find(".j5v-input input").setValue("1234");
      await wrapper.find(".j5v-input input").trigger("blur");
      await wrapper.find(".j5v-input input").trigger("focus");
      expect(wrapper.find(".j5v-label-error").exists()).toBeFalsy();

      await wrapper.find(".j5v-input input").setValue("teltest");
      await wrapper.find(".j5v-input input").trigger("blur");
      await wrapper.find(".j5v-input input").trigger("focus");
      expect(wrapper.find(".j5v-label-error").exists()).toBeTruthy();
    });
  });

  describe("Test input tipo number", async () => {
    it("Input-number: Validando atributos al montar", async () => {
      const wrapper = mount(J5VInput, {
        props: {
          type: "number",
        },
      });
      expect(wrapper.find(".j5v-input input").attributes().type).toBe("text");
      expect(wrapper.find(".j5v-input input").attributes().inputmode).toBe(
        "decimal"
      );
    });

    it("Input-number: Validando escritura del input numero entero", async () => {
      const wrapper = mount(J5VInput, {
        props: {
          type: "number",
        },
      });
      let inputElement = wrapper.find(".j5v-input input")
        .element as VueNode<HTMLInputElement>;

      await wrapper.find(".j5v-input input").setValue("1234");
      inputElement = wrapper.find(".j5v-input input")
        .element as VueNode<HTMLInputElement>;
      expect(inputElement.value).toBe("1234");
    });

    it("Input-number: Validando escritura del input numero decimal", async () => {
      const wrapper = mount(J5VInput, {
        props: {
          type: "number",
        },
      });
      let inputElement = wrapper.find(".j5v-input input")
        .element as VueNode<HTMLInputElement>;

      await wrapper.find(".j5v-input input").setValue(numberNormalizate("1234.3"));
      inputElement = wrapper.find(".j5v-input input")
        .element as VueNode<HTMLInputElement>;
      expect(inputElement.value).toBe(numberNormalizate("1234.3"));
    });

    it("Input-number: Validando escritura del input con una letra", async () => {
      const wrapper = mount(J5VInput, {
        props: {
          type: "number",
        },
      });
      let inputElement = wrapper.find(".j5v-input input")
        .element as VueNode<HTMLInputElement>;

      await wrapper.find(".j5v-input input").setValue("1234.f");
      inputElement = wrapper.find(".j5v-input input")
        .element as VueNode<HTMLInputElement>;
      expect(inputElement.value).toBe("1234.");
    });

    it("Input-number: Validando escribir solo numeros", async () => {
      const wrapper = mount(J5VInput, {
        props: {
          type: "number",
        },
      });
      let inputElement = wrapper.find(".j5v-input input")
        .element as VueNode<HTMLInputElement>;

      await wrapper.find(".j5v-input input").setValue(numberNormalizate("1."));
      await wrapper.find(".j5v-input input").trigger("input", { data: "." });
      inputElement = wrapper.find(".j5v-input input")
        .element as VueNode<HTMLInputElement>;
      expect(inputElement.value).toBe(numberNormalizate("1."));
    });
  });

  describe("Test clipboard", async () => {
    it("clipboard: Evento paste normal", async () => {
      const wrapper = mount(J5VInput, {
        props: {
          type: "number",
        },
      });

      await wrapper.find(".j5v-input input").trigger("paste", {
        clipboardData: {
          getData: () => "1234",
        },
      });
      let inputElement = wrapper.find(".j5v-input input")
        .element as VueNode<HTMLInputElement>;
      expect(inputElement.value).toBe("1234");
    });

    it("clipboard: Evento paste con input tipo number y una letra en el portapapeles", async () => {
      const wrapper = mount(J5VInput, {
        props: {
          type: "number",
        },
      });

      let inputElement = wrapper.find(".j5v-input input")
        .element as VueNode<HTMLInputElement>;

      await wrapper.find(".j5v-input input").trigger("paste", {
        clipboardData: {
          getData: () => "1234fe",
        },
      });
      inputElement = wrapper.find(".j5v-input input")
        .element as VueNode<HTMLInputElement>;
      expect(inputElement.value).toBe("");
    });

    it("clipboard: Evento paste con input tipo number y un numero decimal en el portapapeles", async () => {
      const wrapper = mount(J5VInput, {
        props: {
          type: "number",
        },
      });

      let inputElement = wrapper.find(".j5v-input input")
        .element as VueNode<HTMLInputElement>;

      await wrapper.find(".j5v-input input").trigger("paste", {
        clipboardData: {
          getData: () => "1234.3",
        },
      });
      inputElement = wrapper.find(".j5v-input input")
        .element as VueNode<HTMLInputElement>;
      expect(inputElement.value).toBe(numberNormalizate("1234.3"));
    });

    it("clipboard: Evento paste con input tipo tel", async () => {
      const wrapper = mount(J5VInput, {
        props: {
          type: "tel",
        },
      });

      let inputElement = wrapper.find(".j5v-input input")
        .element as VueNode<HTMLInputElement>;

      await wrapper.find(".j5v-input input").trigger("paste", {
        clipboardData: {
          getData: () => "1234",
        },
      });
      inputElement = wrapper.find(".j5v-input input")
        .element as VueNode<HTMLInputElement>;
      expect(inputElement.value).toBe("1234");
    });

    it("clipboard: Evento copy con objeto clipboard existente", async () => {
      const wrapper = mount(J5VInput, {
        props: {
          type: "number",
        },
      });

      await wrapper.find(".j5v-input input").trigger("copy", {
        clipboardData: {
          setData: () => "1234",
        },
      });
      expect(wrapper.emitted().copy).toBeTruthy();
    });

    it("clipboard: Evento copy con objeto clipboard undefinded", async () => {
      const wrapper = mount(J5VInput, {
        props: {
          type: "number",
        },
      });

      await wrapper.find(".j5v-input input").trigger("copy", {
        clipboardData: undefined,
      });

      expect(wrapper.emitted().copy).toBeTruthy();
    });
  });
});
