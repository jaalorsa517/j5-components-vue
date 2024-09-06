import { describe, it, expect } from "vitest";
import { mount, shallowMount } from "@vue/test-utils";
import { J5VIcons } from "lib/main";

describe("J5VIcons component", async () => {

  it("El componente existe", () => {
    expect(J5VIcons).toBeTruthy();
  });

  it("El componente no tiene la prop name", () => {
    const wrapper = mount(J5VIcons, {
      props: {
        name: "",
      },
    });
    expect(wrapper.html()).toBe("<!--v-if-->");

    wrapper.unmount();
  });

  it('Caso de regex <path(.*)stroke="(.*)">', () => {
    const wrapper = mount(J5VIcons, {
      props: {
        name: "edit",
      },
    });
    expect(wrapper.html()).toMatch(new RegExp('<path(.*)stroke="(.*)">', "g"));

    wrapper.unmount();
  });

  it("Caso de regex <line", () => {
    const wrapper = mount(J5VIcons, {
      props: {
        name: "plus",
      },
    });
    expect(wrapper.html()).toMatch(new RegExp("<line", "g"));
    wrapper.unmount();
  });

  it('Caso de regex <polygon(.*)stroke="(.*)">', () => {
    const wrapper = shallowMount(J5VIcons, {
      global: {
        provide: {
          "j5v-icons": {
            polygonStroke: `<svg><polygon stroke="black"></polygon></svg>`,
          },
        },
      },
      props: {
        name: "polygonStroke",
      },
    });
    expect(wrapper.html()).toMatch(
      new RegExp('<polygon(.*)stroke="(.*)">', "g")
    );
    wrapper.unmount();
  });

  it("Caso de regex <polygon", () => {
    const wrapper = shallowMount(J5VIcons, {
      global: {
        provide: {
          "j5v-icons": {
            polygon: `<svg><polygon></polygon></svg>`,
          },
        },
      },
      props: {
        name: "polygon",
      },
    });
    expect(wrapper.html()).toMatch(new RegExp("<polygon", "g"));
    wrapper.unmount();
  });

  it("Caso de regex <rect", () => {
    const wrapper = shallowMount(J5VIcons, {
      global: {
        provide: {
          "j5v-icons": {
            rect: `<svg><rect></rect></svg>`,
          },
        },
      },
      props: {
        name: "rect",
      },
    });
    expect(wrapper.html()).toMatch(new RegExp("<rect", "g"));
    wrapper.unmount();
  });

  it("Caso de regex <circle", () => {
    const wrapper = shallowMount(J5VIcons, {
      global: {
        provide: {
          "j5v-icons": {
            circle: `<svg><circle></circle></svg>`,
          },
        },
      },
      props: {
        name: "circle",
      },
    });
    expect(wrapper.html()).toMatch(new RegExp("<circle", "g"));
    wrapper.unmount();
  });

  it("El componente monta con un icono inválido", () => {
    const wrapper = mount(J5VIcons, {
      props: {
        name: "invalido",
      },
    });
    expect(wrapper.text()).toBe("?");
    wrapper.unmount();
  });
});
