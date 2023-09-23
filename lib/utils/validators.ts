const symbolDecimal = 1.1.toLocaleString().replace(/\d/g, '');
const validatePhone = (phone: string) => /^[0-9]+$/.test(phone);
const validateEmail = (email: string) =>
  /.+[^@]@[\w,\d]+\.[\w]{2,}/.test(email);
const validateNumber = (number: string) => new RegExp(`^\\d+((\\${symbolDecimal}\\d+)?|(\\${symbolDecimal})?)$`, "gm").test(number);

/**
 * Función que elimina los elementos de error
 * @param {HTMLElement} el
 */
const inputSuccess = (el: HTMLElement) => {
  el.nextElementSibling ? el.nextElementSibling.remove() : false;
  el.classList.remove("j5-input-error");
};

/**
 * Función que agrega los elementos de error
 * @param {HTMLElement} el
 */
const inputError = (el: HTMLElement) => {
  const text = el.getAttribute("name") || el.getAttribute("placeholder") || "";
  el.nextElementSibling ? el.nextElementSibling.remove() : false;
  el.insertAdjacentHTML(
    "afterend",
    `<div class='j5-label-error j5-input-error'>${text} incorrecto</div>`
  );
  el.classList.add("j5-input-error");
};

/**
 * Función que valida input
 * @param {HTMLElement} el
 * @param {*} type
 */
const validateInput = (el: HTMLInputElement, type = "") => {
  const _type = type || el.type;
  if (type === "image") {
    el.files?.length && /\.[jpg|png|gif]+$/.test(el.files[0].name)
      ? inputSuccess(el)
      : inputError(el);
    return;
  }
  const value = el.value;
  if (el.required && !value) {
    inputError(el);
    return;
  }
  if (_type === "text") {
    value ? inputSuccess(el) : inputError(el);
    return;
  }
  if (_type === "number") {
    validateNumber(value) ? inputSuccess(el) : inputError(el);
    return;
  }
  if (_type === "tel") {
    validatePhone(value) ? inputSuccess(el) : inputError(el);
    return;
  }
  if (_type === "email") {
    validateEmail(value) ? inputSuccess(el) : inputError(el);
    return;
  }
};

export { validateInput };
