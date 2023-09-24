import { describe, it, expect, afterEach } from "vitest";
import { mount, shallowMount } from "@vue/test-utils";
import { J5Icons } from "../../lib/main";

describe("J5Icons component", async () => {
  afterEach(() => {});

  it("El componente existe", () => {
    expect(J5Icons).toBeTruthy();
  });

  it("El componente no tiene la prop name", () => {
    const wrapper = mount(J5Icons, {
      props: {
        name: "",
      },
    });
    expect(wrapper.html()).toBe("<!--v-if-->");

    wrapper.unmount();
  });

  it('Caso de regex <path(.*)stroke="(.*)">', () => {
    const wrapper = mount(J5Icons, {
      props: {
        name: "edit",
      },
    });
    expect(wrapper.html()).toMatch(new RegExp('<path(.*)stroke="(.*)">', "g"));

    wrapper.unmount();
  });

  it("Caso de regex <line", () => {
    const wrapper = mount(J5Icons, {
      props: {
        name: "plus",
      },
    });
    expect(wrapper.html()).toMatch(new RegExp("<line", "g"));
    wrapper.unmount();
  });

  it('Caso de regex <polygon(.*)stroke="(.*)">', () => {
    const wrapper = shallowMount(J5Icons, {
      global: {
        provide: {
          "j5-icons": {
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
    const wrapper = shallowMount(J5Icons, {
      global: {
        provide: {
          "j5-icons": {
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
    const wrapper = shallowMount(J5Icons, {
      global: {
        provide: {
          "j5-icons": {
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
    const wrapper = shallowMount(J5Icons, {
      global: {
        provide: {
          "j5-icons": {
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
    const wrapper = mount(J5Icons, {
      props: {
        name: "invalido",
      },
    });
    expect(wrapper.text()).toBe("?");
    wrapper.unmount();
  });
});
