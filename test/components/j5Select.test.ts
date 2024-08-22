import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import { J5VSelect } from "../../lib/main";

describe("J5Select component", () => {
  it("El componente monta con default", () => {
    const wrapper = mount(J5VSelect);
    const select = wrapper.find("select");
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element.childElementCount).toBe(0);
    expect(wrapper.props().options).toStrictEqual([]);
    expect(select.attributes().name).toBe("");
    expect(select.element.value).toBe("");
    wrapper.unmount();
  });

  it("El componente monta con props", () => {
    const wrapper = mount(J5VSelect, {
      props: {
        modelValue: "2",
        name: "name_demo",
        options: [
          { value: "1", text: "1" },
          { value: "2", text: "2" },
          { value: "3", text: "3" },
        ],
      },
    });
    const select = wrapper.find("select");
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.element.childElementCount).toBe(3);
    expect(wrapper.props().options).toStrictEqual([
      { value: "1", text: "1" },
      { value: "2", text: "2" },
      { value: "3", text: "3" },
    ]);
    expect(select.attributes().name).toBe("name_demo");
    expect(select.element.value).toBe("2");
  });

  it("El componente se actualiza la prop modelValue (v-model)", async () => {
    const wrapper = mount(J5VSelect, {
      props: {
        modelValue: "2",
        name: "name_demo",
        "onUpdate:modelValue": (e) => wrapper.setProps({ modelValue: e }),
        options: [
          { value: "1", text: "1" },
          { value: "2", text: "2" },
          { value: "3", text: "3" },
        ],
      },
    });
    await wrapper.setValue("3");
    expect(wrapper.props().modelValue).toBe("3");
    expect(wrapper.emitted("update:modelValue")?.at(0)).toStrictEqual(["3"]);
  });

  it("El componente se actualiza cuando la prop se actualiza", async () => {
    const wrapper = mount(J5VSelect, {
      props: {
        modelValue: "2",
        name: "name_demo",
        options: [
          { value: "1", text: "1" },
          { value: "2", text: "2" },
          { value: "3", text: "3" },
        ],
      },
    });
    const select = wrapper.find("select");
    expect(select.element.value).toBe("2");

    await wrapper.setProps({
      modelValue: "3",
    });

    expect(select.element.value).toBe("3");
  });
});
