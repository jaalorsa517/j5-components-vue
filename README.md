![Static Badge](https://img.shields.io/badge/license-MIT-blue?style=plastic) [![tests](https://github.com/jaalorsa517/j5-components-vue/actions/workflows/unit-test.yml/badge.svg?branch=main&event=push)](https://github.com/jaalorsa517/j5-components-vue/actions/workflows/unit-test.yml) [![deploy](https://github.com/jaalorsa517/j5-components-vue/actions/workflows/deploy-npm.yml/badge.svg?branch=main&event=workflow_run)](https://github.com/jaalorsa517/j5-components-vue/actions/workflows/deploy-npm.yml)


# J5 components Vue

## Componentes

### J5Alert

#### Props
+ **hasBtnCancel** (tipo: Boolean, valor predeterminado: false): Indica si se debe mostrar el botón de cancelar en el pie de página.
+ **title** (tipo: String, valor predeterminado: 'Alerta'): El título del componente de alerta.
+ **body** (tipo: String, valor predeterminado: ''): El contenido del cuerpo del componente de alerta.
+ **btnOkText** (tipo: String, valor predeterminado: 'Aceptar'): El texto del botón de aceptar.
+ **btnCancelText** (tipo: String, valor predeterminado: 'Cancelar'): El texto del botón de cancelar.

#### Slots
+ **header:** Permite personalizar la sección de encabezado del componente de alerta.
+ **body:** Permite personalizar la sección de cuerpo del componente de alerta.
+ **footer:** Permite personalizar la sección de pie de página del componente de alerta.

#### Eventos
+ **confirm:** Se emite cuando se hace clic en el botón de aceptar o cancelar. El valor emitido es un booleano que indica si se hizo clic en el botón de aceptar (true) o cancelar (false).

#### Estilos
El componente de alerta utiliza estilos en SCSS para su apariencia. Algunas clases de interés son:

```css
.j5-alert: Clase principal del componente de alerta.
.j5-alert__content: Clase del contenedor del contenido del componente de alerta.
.j5-alert__header: Clase del encabezado del componente de alerta.
.j5-alert__title: Clase del título del componente de alerta.
.j5-alert__body: Clase del cuerpo del componente de alerta.
.j5-alert__footer: Clase del pie de página del componente de alerta.
.j5-alert__button: Clase de los botones del componente de alerta.
```

### J5Icons
El componente J5Icons es un componente de Vue que renderiza un ícono SVG basado en el nombre proporcionado.

#### Props
+ **name** (String): El nombre del ícono a renderizar.
+ **color** (String, por defecto: "currentColor"): El color del ícono. También se puede modificar a través del css.

#### Uso

Se importa y se usa en la sección Template
```
<template>
  <J5Icons name="nombreIcono" color="#ff0000" />
</template>
```
#### Personalizar iconos
Existe la opción de añadir iconos propios. Basta con crear un objeto clave-valor, donde la clave en es identificador del icono y el valor el svg en string. Este proceso se inyecta a través de la función `provide` de vue, con el nombre **j5-icons**
```javascript
import { provide } from "vue"
const icon = {
  minus:"<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M6 12H18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>"
}
provide("j5-icons", icon)

```
### J5Input
El componente J5Input es un campo de entrada de texto personalizado. Permite al usuario ingresar, editar texto validar segun tipo de input. Tiene la capacidad para vincular un v-model.

#### Props
+ **type (tipo: String, valor predeterminado: 'text')**: Indica el tipo de campo de entrada. Puede ser 'text', 'tel', 'email' o 'number'.
+ **placeholder (tipo: String, valor predeterminado: '')**: Texto que se muestra como marcador de posición dentro del campo de entrada. También sirve para complementar el mensaje de Validación, en caso de que esté activado.
+ **name (tipo: String, valor predeterminado: '')**: El nombre del campo de entrada, que se enviará junto con el formulario cuando se envíe.
+ **required (tipo: Boolean, valor predeterminado: false)**: Indica si el campo de entrada es obligatorio. Puede servir al momento de validar formularios.
+ **initialValue (tipo: String, valor predeterminado: '')**: Valor para iniciar el componente con un valor predeterminado, en caso que no se vincule un v-model.
+ **disabled (tipo: Boolean, valor predeterminado: false)**: Desactiva/activa el componente a la edición.
+ **hasFocus (tipo: Boolean, valor predeterminado: false)**: Indica si el campo de entrada debe tener el foco automáticamente al renderizarse. Sí multiples componentes tienen activada la prop, el focus lo tendrá el último componente.
+ **hasInputEvent (tipo: Boolean, valor predeterminado: false)**: Indica sí se debe activar las validaciones del input.
+ **hasFocusEvent (tipo: Boolean, valor predeterminado: false)**: Indica sí se debe activar las validaciones del input.
+ **hasBlurEvent (tipo: Boolean, valor predeterminado: false)**: Indica sí se debe activar las validaciones del input.

#### Estilos
El componente J5Input utiliza estilos en SCSS para su apariencia. Algunas clases de interés son:

```
.j5-input: Clase principal del componente de campo de entrada.
.j5-input-error: Clase para el estilo en caso de fallar la validación.
.j5-label-error: Clase para el mensaje que sale al fallar la validación.
```

### J5Select
El componente Select es un componente Vue.js que muestra un menú desplegable de opciones y permite al usuario seleccionar una opción.

#### Props
+ **options (Array<OptionType>)**: Un array de objetos que representan las opciones del menú desplegable. Cada objeto debe tener las propiedades "value" y "text", que representan el valor y el texto de la opción, respectivamente. Por defecto, se proporciona un array vacío.

+ **name (String)**: El nombre del elemento select. Por defecto, no se proporciona ningún nombre.

#### Uso
El componente se debería usar con un v-model de la siguiente manera:
```
<template>
  <J5Select :options="options" v-model="selectedOption" name="mySelect"></J5Select>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { J5Select, OptionType } from '@jaalorsa/components-vue';

const options: Array<OptionType> = [
  { value: 'option1', text: 'Opción 1' },
  { value: 'option2', text: 'Opción 2' },
  { value: 'option3', text: 'Opción 3' },
];

const selectedOption = ref('');

</script>
```
En el ejemplo anterior, se importa el componente SelectDropdown y se le pasa un array de opciones y una variable de datos llamada selectedOption que almacena el valor seleccionado actualmente. Al seleccionar una opción en el menú desplegable, se actualiza automáticamente el valor de selectedOption.

### Estilos
El componente se puede personalizar estilos, segun la necesidad requerida, al usar la clase `.j5-select`.
