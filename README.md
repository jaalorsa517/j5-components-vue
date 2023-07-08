# J5 components Vue

## Componentes
### Component Alerta
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