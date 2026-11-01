# Declaración de uso de IA

## 1. Herramientas de IA utilizadas y etapas en las que se utilizo

Durante el desarrollo del proyecto Task-Manager se utilizó ChatGPT como herramienta de apoyo para resolver 
dudas, revisar fragmentos de código, comprender conceptos de JavaScript y mejorar la organización de la aplicación.
 
- **Planificación:** orientación de la técnica (módulos ES6) 
- **Elección de la técnica de investigación:** recomendación de (módulos ES6) y diseño de la arquitectura (`main.js`, `api.js`, `storage.js`, `tasks.js`, `ui.js`).
- **Base visual:** propuesta inicial de `index.html` y `styles.css`, que luego modifiqué y rediseñé.
- **Desarrollo:** resolución de dudas sobre JavaScript.
- **Lógica de programación:** revisión de las operaciones CRUD, filtros, búsqueda y ordenamiento.
- **Almacenamiento:** comprensión e implementación de LocalStorage.
- **Consumo de API:** orientación para utilizar Fetch API, async/await y manejo de errores.
- **Diseño Visual:** UXMagic.ai para el diseño de la Interfaz UI
- **Pruebas:** apoyo para identificar posibles errores y verificar el funcionamiento de las funcionalidades.


## 2. Prompts importantes utilizados

**Prompt 1:**

"Explícame cómo organizar mi proyecto utilizando módulos ES6, separando la lógica de las tareas, la manipulación del DOM, el consumo de una API REST y el almacenamiento mediante LocalStorage."

**Prompt 2:**

"Revisa el funcionamiento de mi aplicación Task-Manager y ayúdame a comprobar que las tareas se guarden correctamente, que se recuperen al recargar la página y que se manejen los errores de conexión con la API."

## 3. Partes con errores o ajustes manuales

Las respuestas y sugerencias proporcionadas por la inteligencia artificial fueron revisadas durante el desarrollo. 
No se aceptaron automáticamente todos los cambios propuestos.

Se realizaron pruebas manuales para comprobar el funcionamiento de la aplicación, incluyendo:

- Creación de descripción, etiquetas y atributos de accesibilidad en HTML.
- Creación, edición y eliminación de tareas.
- Cambio del estado entre pendiente y completado.
- Validación de títulos vacíos o con espacios.
- Funcionamiento de filtros, búsqueda y ordenamiento.
- Actualización de las estadísticas.
- Persistencia de datos mediante LocalStorage.
- Importación de tareas desde JSONPlaceholder.
- Manejo de errores al simular una dirección incorrecta de la API.

## 4. Responsabilidad del desarrollo

La inteligencia artificial fue utilizada como herramienta de apoyo y aprendizaje. 
La revisión, adaptación, integración y comprobación del código se realizaron durante el desarrollo del proyecto, 
con el objetivo de comprender el funcionamiento de cada módulo y verificar los resultados obtenidos.