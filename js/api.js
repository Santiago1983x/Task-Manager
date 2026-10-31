// ==========================================================
// Servicio API - Obtener tareas de JSONPlaceholder
// y adaptarlas al formato de la aplicación.
// ==========================================================

const API_URL = "https://jsonplaceholder.typicode.com/todos";
const TASK_LIMIT = 15;
const PRIORITIES = ["alta", "media", "baja"];
const ONE_DAY = 24 * 60 * 60 * 1000;

/*** Convierte una tarea de la API al formato de la aplicación. */
function adaptTask(apiTask, index) {
    return {
        id: apiTask.id,
        title: apiTask.title,
        description: "",
        completed: apiTask.completed,
        priority: PRIORITIES[apiTask.id % PRIORITIES.length],
        // Cada tarea se crea un día antes que la anterior,
        // para que el ordenamiento por fecha tenga datos distintos.
        createdAt: Date.now() - index * ONE_DAY
    };
}

/*** Obtiene las primeras tareas de la API. 
 * Si falla la red o el servidor responde con error, lanza una excepción. */
export async function fetchTasks() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error(`El servidor respondió con el estado ${response.status}`);
    }

    const data = await response.json();
    return data.slice(0, TASK_LIMIT).map(adaptTask);
}