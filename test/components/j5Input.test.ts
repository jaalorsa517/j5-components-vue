import { describe, it, expect, afterEach } from "vitest";
import { mount, shallowMount } from "@vue/test-utils";
import { J5Input } from "../../lib/main";
import { VueNode } from "@vue/test-utils/dist/types";

describe("J5Input component", async () => {
  it("El componente monta con default", () => {
    expect(J5Input).toBeTruthy();
    const wrapper = mount(J5Input);
    const input = wrapper.find(".j5-input input");
    expect(input.exists()).toBeTruthy();
    expect(input.attributes().placeholder).toBe("");
    expect(input.attributes().type).toBe("text");
    expect(input.attributes().inputmode).toBe("text");
    expect(input.attributes().name).toBe("");
    expect(input.attributes().disabled).toBeUndefined();
    expect(input.attributes().required).toBeUndefined();
    wrapper.unmount();
  });

  it("El componente monta con props", () => {
    const wrapper = mount(J5Input, {
      props: {
        placeholder: "Placeholder",
        type: "email",
        name: "name",
        disabled: true,
        required: true,
      },
    });
    const input = wrapper.find(".j5-input input");
    expect(input.attributes().placeholder).toBe("Placeholder");
    expect(input.attributes().type).toBe("text");
    expect(input.attributes().inputmode).toBe("email");
    expect(input.attributes().name).toBe("name");
    expect(input.attributes().disabled).toBe("");
    expect(input.attributes().required).toBe("");
    wrapper.unmount();
  });

  it("Input tipo text", async () => {
    const wrapper = mount(J5Input, {
      props: {
        type: "text",
        placeholder: "text",
        required: true,
        hasInputEvent: true,
      },
    });
    const input = wrapper.find(".j5-input > input");
    await input.setValue("J");
    const inputValue = wrapper.find(".j5-input > input")
      .element as VueNode<HTMLInputElement>;
    expect(input.attributes().placeholder).toBe("text");
    expect(input.attributes().type).toBe("text");
    expect(inputValue.value).toBe("J");
    expect(wrapper.emitted()["update:modelValue"][0]).toStrictEqual(["J"]);

    await input.setValue("");
    const labelError = wrapper.find(".j5-label-error");
    expect(labelError.exists()).toBeTruthy();
    expect(labelError.text()).toBe("text incorrecto");

    await input.setValue("Texto demo");
    expect(wrapper.find(".j5-label-error").exists()).toBeFalsy();
    wrapper.unmount();
  });

  it("Input tipo email", async () => {
    const wrapper = mount(J5Input, {
      hasBlurEvent: true,
    });
    const input = wrapper.find(".j5-input input");
    await input.setValue("emailTest");
    await input.trigger("blur");
    expect(wrapper.find(".j5-label-error").exists()).toBeTruthy();
    wrapper.unmount();
  });
});
