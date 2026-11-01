// ==========================================================
// main.js - Punto de entrada - Conecta los módulos: carga inicial, eventos y refresh.
// ==========================================================

import { fetchTasks } from "./api.js";
import { hasStoredTasks, getTasks, saveTasks } from "./storage.js";
import {
    createTask, updateTask, deleteTask, toggleTask,
    filterTasks, sortTasks, getMetrics
} from "./tasks.js";
import {
    renderTasks, renderMetrics, showNotification,
    getFormValues, setEditMode, resetForm
} from "./ui.js";

// ===== ESTADO =====

let tasks = [];
let editingId = null; // id de la tarea en edición, o null si se está creando

const taskListElement = document.getElementById("task-list");
const formElement = document.getElementById("task-form");
const cancelButton = document.getElementById("task-cancel");
const searchInput = document.getElementById("search");
const filterSelect = document.getElementById("filter");
const sortSelect = document.getElementById("sort");

// ===== Filtra, ordena y dibuja =====

/** Dibuja la lista (con filtros y orden) y las métricas (de todas las tareas). */
function render() {
    const visible = sortTasks(
        filterTasks(tasks, filterSelect.value, searchInput.value),
        sortSelect.value
    );

    const hasFilters = searchInput.value.trim() !== "" || filterSelect.value !== "todas";
    const emptyText = tasks.length > 0 && hasFilters
        ? "Ninguna tarea coincide con la búsqueda."
        : "Todavía no existen tareas registradas.";

    renderTasks(visible, emptyText);
    renderMetrics(getMetrics(tasks));
}

/** Guarda en localStorage y vuelve a dibujar. */
function refresh() {
    if (!saveTasks(tasks)) {
        showNotification("No se pudieron guardar los cambios en el navegador.");
    }
    render();
}

// ===== CARGA INICIAL =====

async function loadInitialTasks() {
    // Si ya hay datos guardados (aunque sea una lista vacía), no se consulta la API.
    if (hasStoredTasks()) {
        tasks = getTasks();
        render();
        return;
    }

    // Primera vez: se consulta JSONPlaceholder.
    try {
        tasks = await fetchTasks();
        refresh();
        showNotification("Tareas iniciales importadas correctamente.", "success");
    } catch (error) {
        console.error("Error al cargar desde la API:", error);
        tasks = [];
        render();
        showNotification(
            "No se pudieron cargar las tareas iniciales. Revisa tu conexión e inténtalo de nuevo."
        );
    }
}

// ===== EVENTOS =====

/** Crear o editar, según editingId. */
function handleSubmit(event) {
    event.preventDefault();
    const values = getFormValues();

    const result = editingId === null
        ? createTask(tasks, values)
        : updateTask(tasks, editingId, values);

    if (result.error) {
        showNotification(result.error);
        return;
    }

    const wasEditing = editingId !== null;
    tasks = result.tasks;
    editingId = null;
    resetForm();
    refresh();
    showNotification(wasEditing ? "Tarea actualizada." : "Tarea creada.", "success");
}

function handleCancel() {
    editingId = null;
    resetForm();
}

/** Completar, Editar y Eliminar . */
function handleListClick(event) {
    const button = event.target.closest("button[data-action]");
    if (!button) {
        return;
    }

    const id = Number(button.dataset.id);
    const action = button.dataset.action;

    if (action === "toggle") {
        tasks = toggleTask(tasks, id);
        refresh();
    } else if (action === "edit") {
        const task = tasks.find((t) => t.id === id);
        if (task) {
            editingId = id;
            setEditMode(task);
        }
    } else if (action === "delete") {
        const result = deleteTask(tasks, id);
        if (!result.deleted) {
            showNotification("La tarea no existe.");
            return;
        }
        tasks = result.tasks;
        if (editingId === id) {
            editingId = null;
            resetForm();
        }
        refresh();
    }
}

formElement.addEventListener("submit", handleSubmit);
cancelButton.addEventListener("click", handleCancel);
taskListElement.addEventListener("click", handleListClick);
searchInput.addEventListener("input", render);
filterSelect.addEventListener("change", render);
sortSelect.addEventListener("change", render);

// ===== ARRANQUE  =====
loadInitialTasks();