import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import { J5VAlert } from "../../lib/main";

describe("J5VAlert component", async () => {
  it("El componente monta con default", () => {
    expect(J5VAlert).toBeTruthy();
    const wrapper = mount(J5VAlert);
    const title = wrapper.find(".j5v-alert__title");
    const body = wrapper.find(".j5v-alert__body");
    const btnOk = wrapper.find(".j5v-alert__button--submit");

    expect(title.text()).toBe("Alerta");
    expect(body.text()).toBe("");
    expect(btnOk.text()).toBe("Aceptar");
    expect(document.body.classList.contains("no-scroll")).toBeTruthy();

    wrapper.unmount();
    expect(document.body.classList.contains("no-scroll")).toBeFalsy();
  });

  it("El componente monta con slots", () => {
    const wrapper = mount(J5VAlert, {
      slots: {
        header: '<h1 id="title">Alerta Slot</h1>',
        body: '<p id="body">Body Slot</p>',
        footer: '<p id="footer">Footer Slot</p>',
      },
    });
    const title = wrapper.find("#title");
    const body = wrapper.find("#body");
    const footer = wrapper.find("#footer");

    expect(title.text()).toBe("Alerta Slot");
    expect(body.text()).toBe("Body Slot");
    expect(footer.text()).toBe("Footer Slot");
  });

  it("El componente monta con boton cancelar", async () => {
    const wrapper = mount(J5VAlert, {
      props: {
        hasBtnCancel: true,
      },
    });

    const btnCancel = wrapper.find(".j5v-alert__button--cancel");
    expect(btnCancel).toBeTruthy();
    await btnCancel.trigger("click");
    expect(wrapper.emitted().confirm[0]).toStrictEqual([false]);
    wrapper.unmount();
  });

  it("El componente monta con boton Aceptar", async () => {
    const wrapper = mount(J5VAlert);

    const btnOk = wrapper.find(".j5v-alert__button--submit");
    expect(btnOk).toBeTruthy();
    await btnOk.trigger("click");
    expect(wrapper.emitted().confirm[0]).toStrictEqual([true]);
    wrapper.unmount();
  });

  it("Renombrar los botones", async () => {
    const wrapper = mount(J5VAlert, {
      props: {
        hasBtnCancel: true,
        btnOkText: "Confirmar",
        btnCancelText: "Rechazar",
      },
    });

    const btnOk = wrapper.find(".j5v-alert__button--submit");
    const btnCancel = wrapper.find(".j5v-alert__button--cancel");
    expect(btnOk.text()).toBe("Confirmar");
    expect(btnCancel.text()).toBe("Rechazar");
    wrapper.unmount();
  });
});
