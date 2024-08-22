![Static Badge](https://img.shields.io/badge/license-MIT-blue?style=plastic) [![tests](https://github.com/jaalorsa517/j5-components-vue/actions/workflows/unit-test.yml/badge.svg?branch=main&event=push)](https://github.com/jaalorsa517/j5-components-vue/actions/workflows/unit-test.yml) [![deploy](https://github.com/jaalorsa517/j5-components-vue/actions/workflows/deploy-npm.yml/badge.svg?branch=main&event=workflow_run)](https://github.com/jaalorsa517/j5-components-vue/actions/workflows/deploy-npm.yml) [![Unit Test](https://github.com/jaalorsa517/j5-components-vue/actions/workflows/pull-request-test.yml/badge.svg)](https://github.com/jaalorsa517/j5-components-vue/actions/workflows/pull-request-test.yml)


# J5 components Vue

## Modo de uso

Para instalar la librería, en la terminal, ejecutar 

```
npm install @jaalorsa/j5-components-vue 
```

Para usar la librería, es tan sencillo como importar el componente deseado desde la librería y usarlo directamente en el HTML. Por ejemplo:

```
// En el Javascript
import { J5VAlert } from "@jaalorsa/j5-components-vue"
// En el HTML
<J5VAlert></J5VAlert>
```

El componente tiene unos estilos predefinidos. Para activarlos se importan el archivo css para que se inyecte al DOM.

```
//En un archivo css
@import "@jaalorsa/j5-components-vue/style.css";
// En un archivo Javascript
import "@jaalorsa/j5-components-vue/style.css";
```

**Nota:** Tener presente que la importación dependerá de la herramienta de empaquetado usado en el proyecto. La herramienta recomendada es Vite.

Cada componente tiene sus propios estilos, por lo que se puede personalizar de manera sencilla, al crear una regla de estilos con el nombre de la clase del componente. Estas clases se pueden consultar en la documentación de cada componente. 


## Componentes

### J5VAlert

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
.j5v-alert: Clase principal del componente de alerta.
.j5v-alert__content: Clase del contenedor del contenido del componente de alerta.
.j5v-alert__header: Clase del encabezado del componente de alerta.
.j5v-alert__title: Clase del título del componente de alerta.
.j5v-alert__body: Clase del cuerpo del componente de alerta.
.j5v-alert__footer: Clase del pie de página del componente de alerta.
.j5v-alert__button: Clase de los botones del componente de alerta.
```

### J5VIcons
El componente J5VIcons es un componente de Vue que renderiza un ícono SVG basado en el nombre proporcionado.

#### Props
+ **name** (String): El nombre del ícono a renderizar.
+ **color** (String, por defecto: "currentColor"): El color del ícono. También se puede modificar a través del css.

#### Uso

Se importa y se usa en la sección Template
```
<template>
  <J5VIcons name="nombreIcono" color="#ff0000" />
</template>
```
#### Personalizar iconos
Existe la opción de añadir iconos propios. Basta con crear un objeto clave-valor, donde la clave en es identificador del icono y el valor el svg en string. Este proceso se inyecta a través de la función `provide` de vue, con el nombre **j5v-icons**
```javascript
import { provide } from "vue"
const icon = {
  minus:"<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M6 12H18" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>"
}
provide("j5v-icons", icon)

```
### J5VInput
El componente J5VInput es un campo de entrada de texto personalizado. Permite al usuario ingresar, editar texto validar segun tipo de input. Tiene la capacidad para vincular un v-model.

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
El componente J5VInput utiliza estilos en SCSS para su apariencia. Algunas clases de interés son:

```
.j5v-input: Clase principal del componente de campo de entrada.
.j5v-input-error: Clase para el estilo en caso de fallar la validación.
.j5v-label-error: Clase para el mensaje que sale al fallar la validación.
```

### J5VSelect
El componente Select es un componente Vue.js que muestra un menú desplegable de opciones y permite al usuario seleccionar una opción.

#### Props
+ **options (Array<OptionType>)**: Un array de objetos que representan las opciones del menú desplegable. Cada objeto debe tener las propiedades "value" y "text", que representan el valor y el texto de la opción, respectivamente. Por defecto, se proporciona un array vacío.

+ **name (String)**: El nombre del elemento select. Por defecto, no se proporciona ningún nombre.

#### Uso
El componente se debería usar con un v-model de la siguiente manera:
```
<template>
  <J5VSelect :options="options" v-model="selectedOption" name="mySelect"></J5VSelect>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { J5VSelect, OptionType } from '@jaalorsa/j5-components-vue';

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
El componente se puede personalizar estilos, segun la necesidad requerida, al usar la clase `.j5v-select`.

### J5VDatalist
El componente Datalist es un componente Vue.js, muy similar al componente J5VSelect, con la diferencia que las opciones mostradas son dinámicas y de acuerdo a lo que se programe el componente.

#### Props

- `options`: (tipo: `Array<string>`, valor por defecto: `[]`) - Las opciones para el componente.
- `placeholder`: (tipo: `String`, valor por defecto: `'Buscar...'`) - El texto de marcador de posición para el campo de búsqueda.
- `hasIcon`: (tipo: `Boolean`, valor por defecto: `false`) - Indica si el componente debe mostrar un ícono.
- `icon`: (tipo: `String`, valor por defecto: `"find"`) - El nombre del ícono a mostrar en el componente. Internamente se usa el componente J5VIcons, así que tener en cuenta el uso de este componente.

#### Eventos

- `inputValue`: Se emite cuando se cambia el valor del campo de búsqueda. El valor emitido es el valor del campo de búsqueda y es un tipo string.
- `itemSelected`: Se emite cuando se selecciona una opción. El valor emitido es el valor de la opción y puede ser un tipo string o un objeto tipo HTMLElement (Slots).


#### Uso

El componente tiene 2 modos de uso que no pueden existir simultáneamente:
1. Usando props para valores strings.
  ```
   <J5VDatalist :hasIcon="true" :options="options" @inputValue="setOption" @itemSelected="selecteds.push($event)" />
  ```
2. Usando Slots para mayor personalización.
  ```
  <J5VDatalist :hasIcon="true" v-model="inputValue" @itemSelected="onItemSelected">
    <li class="datalist__item" v-for="option, index in options2" :key="index">
      <span>{{ index }}</span>
      <span>{{ option }}</span>
    </li>
  </J5VDatalist>
   ```
Tener en cuenta que cualquiera de las opciones activa los eventos del componente, donde depende de la necesidad del uso al agregar valores a las opciones o de procesar los items seleccionados.

#### Estilos
El componente se puede personalizar estilos, segun la necesidad requerida, al usar las siguientes clases:
```
.j5v-datalist: clase contenedora.
.j5v-datalist__input: campo de texto.
.j5v-datalist__icon: ícono adyacente al campo de texto.
.j5v-datalist__datalist: lista desplegable.
.j5v-datalist__item: elemento de la lista desplegable. Solo cuando es la opción de props.
.j5v-datalist__mask: máscara para el control del datalist activo.
```