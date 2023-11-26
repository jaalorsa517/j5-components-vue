import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { J5VDatalist } from "../../lib/main";

describe("J5VIcons component", async () => {
  it("El componente existe", () => {
    expect(J5VDatalist).toBeTruthy();
  });

  it("El componente monta con default", () => {
    const wrapper = mount(J5VDatalist);
    const input = wrapper.find(".j5v-datalist__input input");
    expect(wrapper.html()).toBeTruthy();
    expect(input).toBeTruthy();
    wrapper.unmount();
  });

  it("El componente monta con icono", () => {
    const wrapper = mount(J5VDatalist, {
      props: {
        hasIcon: true,
      },
    });
    const input = wrapper.find(".j5v-datalist__input input");
    const icon = wrapper.find(".j5v-datalist__icon");
    expect(input).toBeTruthy();
    expect(icon).toBeTruthy();
    wrapper.unmount();
  });

  it("El componente monta con el datalist", () => {
    const wrapper = mount(J5VDatalist, {
      props: {
        options: ["Option 1", "Option 2", "Option 3"],
      },
    });
    const input = wrapper.find(".j5v-datalist__input input");
    const datalist = wrapper.find(".j5v-datalist__list");
    expect(input).toBeTruthy();
    expect(datalist).toBeTruthy();
    wrapper.unmount();
  });

  it("El componente emite evento inputValue", async () => {
    const wrapper = mount(J5VDatalist);
    vi.useFakeTimers({shouldAdvanceTime: true, shouldClearNativeTimers: true})
    const input = wrapper.find(".j5v-datalist__input input");
    await input.setValue("Option 1");
    vi.advanceTimersByTime(300)
    expect(wrapper.emitted().inputValue[0]).toStrictEqual(["Option 1"]);
    wrapper.unmount();
    vi.useRealTimers()
  });
  
  it("El componente no emite el evento inputValue sí el valor es vacío", async()=>{
    const wrapper = mount(J5VDatalist);
    vi.useFakeTimers({shouldAdvanceTime: true, shouldClearNativeTimers: true})
    const input = wrapper.find(".j5v-datalist__input input");
    await input.setValue("");
    vi.advanceTimersByTime(300)
    expect(wrapper.emitted().inputValue).toBeUndefined()
    wrapper.unmount();
    vi.useRealTimers()
  })

  it("El componente emite el evento itemSelected", async()=>{
    const wrapper = mount(J5VDatalist,{
      props: {
        options: ["Option 1", "Option 2", "Option 3"],
      },
    });
    const item = wrapper.find(".j5v-datalist__list li");
    await item.trigger("click");
    expect(wrapper.emitted().itemSelected[0]).toStrictEqual(["Option 1"]);
    wrapper.unmount();
  })
  
  it("El componente agrega item al cambair la prop options", async()=>{
    const wrapper = mount(J5VDatalist,{
      props: {
        options: ["Option 1", "Option 2", "Option 3"],
      },
    });
    const item = wrapper.find(".j5v-datalist__list")
    expect(item.element.childElementCount).toBe(3)
    await wrapper.setProps({options: ["Option 1", "Option 2", "Option 3", "Option 4"]})
    expect(item.element.childElementCount).toBe(4)
    wrapper.unmount();
  })
});
