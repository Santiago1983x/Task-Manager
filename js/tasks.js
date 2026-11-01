// ==========================================================
// tasks.js - Lógica de datos - Reglas sobre las tareas (CRUD,
// filtros, orden y métricas). No toca el DOM ni localStorage.
// ==========================================================

const PRIORITY_VALUE = { alta: 3, media: 2, baja: 1 };

/*** Genera un id único basado en la hora actual.
 * Si ya existe (dos tareas creadas en el mismo milisegundo), lo incrementa. */
function generateId(tasks) {
    let id = Date.now();

    while (tasks.some((task) => task.id === id)) {
        id++;
    }

    return id;
}

// ==== VALIDACIÓN ====

/*** Valida el título de una tarea. */
export function validateTitle(title) {
    if (typeof title !== "string" || title.trim() === "") {
        return { valid: false, message: "El título no puede estar vacío." };
    }

    return { valid: true, message: "" };
}

/*** Valida la prioridad. Si no es válida, asigna "media". */
function validatePriority(priority) {
    return Object.hasOwn(PRIORITY_VALUE, priority)
        ? priority
        : "media";
}

// ==== CRUD ====

/*** Crea una tarea nueva y la agrega al arreglo. */
export function createTask(tasks, { title, description, priority }) {
    const validation = validateTitle(title);

    if (!validation.valid) {
        return { tasks, error: validation.message };
    }

    const newTask = {
        id: generateId(tasks),
        title: title.trim(),
        description: (description || "").trim(),
        completed: false,
        priority: validatePriority(priority),
        createdAt: Date.now()
    };

    return { tasks: [...tasks, newTask], error: null };
}

/*** Edita el título, la descripción y la prioridad de una tarea. */
export function updateTask(tasks, id, { title, description, priority }) {
    const validation = validateTitle(title);

    if (!validation.valid) {
        return { tasks, error: validation.message };
    }

    // Comprueba que la tarea exista antes de editarla.
    if (!tasks.some((task) => task.id === id)) {
        return { tasks, error: "La tarea no existe." };
    }

    const updated = tasks.map((task) =>
        task.id === id
            ? {
                  ...task,
                  title: title.trim(),
                  description: (description || "").trim(),
                  priority: priority
                      ? validatePriority(priority)
                      : task.priority
              }
            : task
    );

    return { tasks: updated, error: null };
}

/*** Elimina una tarea por su id e informa si fue encontrada. */
export function deleteTask(tasks, id) {
    const updatedTasks = tasks.filter((task) => task.id !== id);

    return {
        tasks: updatedTasks,
        deleted: updatedTasks.length < tasks.length
    };
}

/*** Alterna el estado completada/pendiente de una tarea. */
export function toggleTask(tasks, id) {
    // Si no existe, devuelve el arreglo sin modificar.
    if (!tasks.some((task) => task.id === id)) {
        return tasks;
    }

    return tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
}

// ==== CONSULTAS: FILTRO, BÚSQUEDA Y ORDEN ====

/*** Filtra por estado ("todas", "pendientes", "completadas")
 * y por texto en el título (sin distinguir mayúsculas). */
export function filterTasks(tasks, status, searchText) {
    const text = (searchText || "").trim().toLowerCase();

    return tasks.filter((task) => {
        const matchesStatus =
            status === "pendientes" ? !task.completed :
            status === "completadas" ? task.completed :
            true;

        const matchesText = task.title.toLowerCase().includes(text);

        return matchesStatus && matchesText;
    });
}

/*** Ordena por "fecha" (la más reciente primero) o por
 * "prioridad" (alta, media, baja). Devuelve una copia. */
export function sortTasks(tasks, criteria) {
    const copy = [...tasks];

    if (criteria === "prioridad") {
        return copy.sort(
            (a, b) => PRIORITY_VALUE[b.priority] - PRIORITY_VALUE[a.priority]
        );
    }

    return copy.sort((a, b) => b.createdAt - a.createdAt);
}

//==== MÉTRICAS ====

/*** Calcula los contadores del dashboard sobre TODAS las tareas. */
export function getMetrics(tasks) {
    const completed = tasks.filter((task) => task.completed).length;

    return {
        total: tasks.length,
        pending: tasks.length - completed,
        completed
    };
}