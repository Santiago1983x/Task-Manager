# TaskManager

Aplicación de gestión de tareas en JavaScript para crear, organizar y administrar tareas de manera sencilla, 
con módulos nativos, para separar la lógica de negocio, la interfaz, el almacenamiento local y la conexión con una API externa.

El proyecto fue desarrollada con **JavaScript Vanilla (ES6+)**, sin librerías ni frameworks. 
Consume la API pública JSONPlaceholder y guarda los datos en `localStorage`, 
por lo que sigue funcionando sin conexión después de la primera carga.

## Tecnologías utilizadas

- HTML5 | CSS3 | JavaScript ES6+
- JSONPlaceholder REST API
- Fetch API y async/await 
- LocalStorage | Módulos ES6 (import/export)

## Funcionalidades

- **CRUD:** crear, editar, eliminar y marcar tareas como completadas, con validación de campos vacíos desde JavaScript.
- **Filtros y búsqueda:** por estado (Todas, Pendientes, Completadas) y búsqueda en tiempo real por título.
- **Ordenamiento:** por fecha de creación o por prioridad (Alta, Media, Baja).
- **Dashboard:** total, pendientes y completadas, actualizados en tiempo real.
- **API Rest:** Importar tareas iniciales desde JSONPlaceholder.
- **Persistencia:** Guardar y recuperar tareas mediante LocalStorage.
- **Manejo de errores:** Mostrar notificaciones cuando ocurre un error de conexión.. 
- La API solo se consulta la primera vez, sin duplicar registros.

## Estructura del proyecto
```
Task-Manager/
|-- index.html
|-- styles.css
|-- README.md
|-- AI_DECLARATION.md
|-- js/
    |-- main.js
    |-- api.js
    |-- storage.js
    |-- tasks.js
    |-- ui.js
```    
## Técnica de investigación: Arquitectura modular ES6 (Opción A)

El código se organiza en módulos nativos con `import` / `export`, cada uno con una única responsabilidad:
```
  Archivo           | Responsabilidad |
|---|---|---|
| `js/main.js`      | Punto de entrada: carga inicial, eventos y conexión de los módulos |
| `js/api.js`       | Servicio API: `fetch` a JSONPlaceholder y adaptación de los datos |
| `js/storage.js`   | Gestor de `localStorage` |
| `js/tasks.js`     | Lógica de datos: CRUD, filtros, orden y métricas (no toca el DOM) |
| `js/ui.js`        | Interfaz: manipulación del DOM (no toca `localStorage`) |

```
## Cómo ejecutarla

1. Clonar o descargar el repositorio.
2. Abrir la carpeta en un editor con servidor local (Phoenix Code Live Preview o Live Server)
3. Ejecutar `index.html` mediante Live Preview. 
4. Contar con conexión a Internet para importar las tareas iniciales.
5. Una vez importadas, las tareas se almacenan en LocalStorage para conservar los cambios realizados.

**Los módulos ES6 no funcionan abriendo `index.html` con doble clic.** 

## API utilizada

JSONPlaceholder:

https://jsonplaceholder.typicode.com/todos

## Declaración de uso de IA

Consulta [AI_DECLARATION.md](AI_DECLARATION.md).