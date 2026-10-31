// ==========================================================
// storage.js - Gestor de localStorage // Guardar y recuperar tareas.
// ==========================================================

const STORAGE_KEY = "taskmanager_tasks";

/** Indica si ya existe algún dato guardado. */
export function hasStoredTasks() {
    return localStorage.getItem(STORAGE_KEY) !== null;
}

/** Devuelve el arreglo de tareas guardado, o [] si no hay datos. */
export function getTasks() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error("Error al leer localStorage:", error);
        return [];
    }
}

/** Guarda el arreglo completo de tareas. Devuelve true si tuvo éxito. */
export function saveTasks(tasks) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        return true;
    } catch (error) {
        console.error("Error al guardar en localStorage:", error);
        return false;
    }
}