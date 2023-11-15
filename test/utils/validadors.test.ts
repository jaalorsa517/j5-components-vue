import { describe, it, expect, afterEach } from "vitest";
import { validateInput } from "../../lib/utils/validators";

const symbolDecimal = (1.1).toLocaleString().replace(/\d/g, "");

describe("Validators", () => {
  afterEach(() => {
    document.body.innerHTML = "";
  });

  it("Agregar y quitar error", async () => {
    const input = document.createElement("input");
    input.type = "number";
    input.value = "13ef";
    const sibling = document.createElement("div");
    document.body.appendChild(input);
    document.body.appendChild(sibling);
    validateInput(input);
    expect(document.querySelector(".j5v-label-error")).toBeTruthy();

    input.value = "12";
    validateInput(input);
    expect(document.querySelector(".j5v-label-error")).toBeNull();
  });

  it("validar atributo type default", async () => {
    const input = document.createElement("input");
    input.type = "number";
    input.value = "13ef";
    document.body.appendChild(input);

    validateInput(input);

    expect(document.querySelector(".j5v-label-error")).toBeTruthy();
  });

  it("validar input con required sin valor", async () => {
    const input = document.createElement("input");
    input.type = "text";
    input.required = true;
    document.body.appendChild(input);

    validateInput(input, "text");

    expect(document.querySelector(".j5v-label-error")).toBeTruthy();
  });

  it("validar input con required y con valor", async () => {
    const input = document.createElement("input");
    input.type = "text";
    input.required = true;
    input.value = "testVallue";
    document.body.appendChild(input);

    validateInput(input, "text");

    expect(document.querySelector(".j5v-label-error")).toBeNull();
  });

  it("Validar input tipo image con tener imagen", async () => {
    const input = document.createElement("input");
    input.type = "image";
    const files = [
      {
        name: "image.jpg",
      },
    ];
    Object.defineProperty(input, "files", {
      value: files,
    });
    document.body.appendChild(input);

    validateInput(input, "image");

    expect(document.querySelector(".j5v-label-error")).toBeNull();
  });

  it("Validar input tipo image sin tener imagen", async () => {
    const input = document.createElement("input");
    input.type = "image";
    document.body.appendChild(input);

    validateInput(input, "image");

    expect(document.querySelector(".j5v-label-error")).toBeTruthy();
  });

  it("Validar input tipo text sin valor", async () => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = "";
    document.body.appendChild(input);

    validateInput(input, "text");

    expect(document.querySelector(".j5v-label-error")).toBeTruthy();
  });

  it("Validar input tipo text con valor", async () => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = "new value";
    document.body.appendChild(input);

    validateInput(input, "text");

    expect(document.querySelector(".j5v-label-error")).toBeNull();
  });

  it("Validar input tipo number sin valor", async () => {
    const input = document.createElement("input");
    input.type = "number";
    input.value = "";
    document.body.appendChild(input);

    validateInput(input, "number");

    expect(document.querySelector(".j5v-label-error")).toBeTruthy();
  });

  it("Validar input tipo number con valor inválido", async () => {
    const input = document.createElement("input");
    input.type = "number";
    input.value = "12fe";
    document.body.appendChild(input);

    validateInput(input, "number");

    expect(document.querySelector(".j5v-label-error")).toBeTruthy();
  });

  it("Validar input tipo number con valor", async () => {
    const input = document.createElement("input");
    input.value = "123.2".replace(".", symbolDecimal);
    document.body.appendChild(input);
    validateInput(input, "number");

    expect(document.querySelector(".j5v-label-error")).toBeNull();
  });

  it("Validar input tipo tel sin valor", async () => {
    const input = document.createElement("input");
    input.type = "tel";
    input.value = "";
    document.body.appendChild(input);

    validateInput(input, "tel");

    expect(document.querySelector(".j5v-label-error")).toBeTruthy();
  });

  it("Validar input tipo tel con valor inválido", async () => {
    const input = document.createElement("input");
    input.type = "tel";
    input.value = "12fe";
    document.body.appendChild(input);

    validateInput(input, "tel");

    expect(document.querySelector(".j5v-label-error")).toBeTruthy();
  });

  it("Validar input tipo tel con valor", async () => {
    const input = document.createElement("input");
    input.type = "tel";
    input.value = "123";
    document.body.appendChild(input);

    validateInput(input, "tel");

    expect(document.querySelector(".j5v-label-error")).toBeNull();
  });

  it("Validar input tipo email sin valor", async () => {
    const input = document.createElement("input");
    input.type = "email";
    input.value = "";
    document.body.appendChild(input);

    validateInput(input, "email");

    expect(document.querySelector(".j5v-label-error")).toBeTruthy();
  });

  it("Validar input tipo email con valor inválido", async () => {
    const input = document.createElement("input");
    input.type = "email";
    input.value = "test.com";
    document.body.appendChild(input);

    validateInput(input, "email");

    expect(document.querySelector(".j5v-label-error")).toBeTruthy();
  });

  it("Validar input tipo email con valor", async () => {
    const input = document.createElement("input");
    input.type = "email";
    input.value = "test@test.com";
    document.body.appendChild(input);

    validateInput(input, "email");

    expect(document.querySelector(".j5v-label-error")).toBeNull();
  });
});
