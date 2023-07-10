# J5 components Vue

## Componentes

### J5Alert

#### Props
**isShow** (tipo: String, valor predeterminado: false): Controla la visibilidad del componente de alerta.
**hasBtnCancel** (tipo: Boolean, valor predeterminado: false): Indica si se debe mostrar el botón de cancelar en el pie de página.
**title** (tipo: String, valor predeterminado: 'Alerta'): El título del componente de alerta.
**body** (tipo: String, valor predeterminado: ''): El contenido del cuerpo del componente de alerta.
**btnOkText** (tipo: String, valor predeterminado: 'Aceptar'): El texto del botón de aceptar.
**btnCancelText** (tipo: String, valor predeterminado: 'Cancelar'): El texto del botón de cancelar.

#### Emits
**confirm:** Se emite cuando se hace clic en el botón de aceptar o cancelar. El valor emitido es un booleano que indica si se hizo clic en el botón de aceptar (true) o cancelar (false).
#### Slots
**header:** Permite personalizar la sección de encabezado del componente de alerta.
**body:** Permite personalizar la sección de cuerpo del componente de alerta.
**footer:** Permite personalizar la sección de pie de página del componente de alerta.

#### Eventos
**onClick**(isConfirm: boolean): Método que se ejecuta cuando se hace clic en un botón. Recibe un parámetro isConfirm que indica si se hizo clic en el botón de aceptar (true) o cancelar (false).

#### Estilos
El componente de alerta utiliza estilos en SCSS para su apariencia. Algunas clases de interés son:

**.j5-alert**: Clase principal del componente de alerta.
**.j5-alert__content**: Clase del contenedor del contenido del componente de alerta.
**.j5-alert__header**: Clase del encabezado del componente de alerta.
**.j5-alert__title**: Clase del título del componente de alerta.
**.j5-alert__body**: Clase del cuerpo del componente de alerta.
**.j5-alert__footer**: Clase del pie de página del componente de alerta.
**.j5-alert__button**: Clase de los botones del componente de alerta.

### J5Input

Este es un componente de entrada personalizado que se puede utilizar en aplicaciones Vue.js. Proporciona funcionalidades como validación, enlaces bidireccionales (`v-model`), eventos personalizados y más.

#### Props

- `type` (String): El tipo de campo de entrada. Por defecto es `'text'`, soporta `'tel'`, `'email'`, `'number'`.
- `placeholder` (String): El texto de marcador de posición para el campo de entrada. Por defecto es una cadena vacía (`''`).
- `name` (String): El nombre del campo de entrada. Por defecto es una cadena vacía (`''`).
- `required` (Boolean): Indica si el campo de entrada es obligatorio. Por defecto es `false`.
- `hasFocus` (Boolean): Indica si el campo de entrada debe tener el foco al renderizarse. Por defecto es `false`.
- `hasInputEvent` (Boolean): Indica si se debe emitir un evento de entrada (`input`) al modificar el valor del campo. Por defecto es `false`.
- `hasFocusEvent` (Boolean): Indica si se debe emitir un evento de foco (`focus`) al enfocar el campo. Por defecto es `false`.
- `hasBlurEvent` (Boolean): Indica si se debe emitir un evento de desenfoque (`blur`) al perder el foco el campo. Por defecto es `false`.

#### Estilos

**.j5-input**: Clase principal del componente.
