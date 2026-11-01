// ==========================================================
// ui.js - Interfaz (DOM) Dibujar en pantalla y leer formulario
// No valida, no filtra y no toca localStorage.
// ==========================================================

// ==== REFERENCIAS AL DOM ====

const taskList = document.getElementById("task-list");
const emptyMessage = document.getElementById("empty-message");
const notification = document.getElementById("notification");

const countTotal = document.getElementById("count-total");
const countPending = document.getElementById("count-pending");
const countCompleted = document.getElementById("count-completed");

const form = document.getElementById("task-form");
const formTitle = document.getElementById("form-title");
const inputTitle = document.getElementById("task-title");
const inputDescription = document.getElementById("task-description");
const inputPriority = document.getElementById("task-priority");
const submitButton = document.getElementById("task-submit");
const cancelButton = document.getElementById("task-cancel");

const PRIORITY_LABEL = { alta: "Alta", media: "Media", baja: "Baja" };
const PRIORITY_CLASS = {
    alta: "priority--high",
    media: "priority--medium",
    baja: "priority--low"
};
const NOTIFICATION_TIME = 4000;
let notificationTimer = null;

// ==== LISTA DE TAREAS =====

/** Crea un botón de acción.
 * data-action y data-id permiten usar un solo listener
 * sobre la lista (event delegation) en main.js. */
function createButton(text, action, id, className) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className;
    button.textContent = text;
    button.dataset.action = action;
    button.dataset.id = id;
    return button;
}

/*** Crea el elemento <li> de una tarea. */
function createTaskElement(task) {
    const item = document.createElement("li");
    item.className = "task-item";
    if (task.completed) {
        item.classList.add("task-item--completed");
    }

    // Información
    const info = document.createElement("div");
    info.className = "task-item__info";

    const title = document.createElement("h3");
    title.className = "task-item__title";
    title.textContent = task.title;
    info.appendChild(title);

    if (task.description) {
        const description = document.createElement("p");
        description.className = "task-item__description";
        description.textContent = task.description;
        info.appendChild(description);
    }

    const priorityClass = PRIORITY_CLASS[task.priority] || PRIORITY_CLASS.media;
    const priorityLabel = PRIORITY_LABEL[task.priority] || PRIORITY_LABEL.media;

    const priority = document.createElement("span");
    priority.className = `task-item__priority ${priorityClass}`;
    priority.textContent = priorityLabel;
    info.appendChild(priority);

    const date = document.createElement("small");
    date.className = "task-item__meta";
    date.textContent = new Date(task.createdAt).toLocaleDateString("es");
    info.appendChild(date);

    // Acciones
    const actions = document.createElement("div");
    actions.className = "task-item__actions";

    actions.append(
        createButton(task.completed ? "Reabrir" : "Completar", "toggle", task.id, "btn-complete"),
        createButton("Editar", "edit", task.id, "btn-edit"),
        createButton("Eliminar", "delete", task.id, "btn-delete")
    );

    item.append(info, actions);
    return item;
}

/** Dibuja la lista completa. Si no hay tareas, muestra el mensaje vacío.
 * emptyText (opcional) permite distinguir "no hay tareas" de
 * "ningún resultado coincide con la búsqueda". */
export function renderTasks(tasks, emptyText) {
    taskList.innerHTML = ""; // solo se vacía; el contenido de las tareas usa textContent

    tasks.forEach((task) => {
        taskList.appendChild(createTaskElement(task));
    });

    if (emptyText) {
        emptyMessage.textContent = emptyText;
    }
    emptyMessage.classList.toggle("hidden", tasks.length > 0);
}

//==== DASHBOARD ====

export function renderMetrics({ total, pending, completed }) {
    countTotal.textContent = total;
    countPending.textContent = pending;
    countCompleted.textContent = completed;
}

//==== NOTIFICACIONES ====

/** Muestra un aviso. type: "error" (por defecto), "success" o "info". */
export function showNotification(message, type = "error") {
    notification.textContent = message;
    notification.className = `notification notification--${type}`;

    clearTimeout(notificationTimer);
    notificationTimer = setTimeout(() => {
        notification.classList.add("hidden");
    }, NOTIFICATION_TIME);
}

// ==== FORMULARIO ====

/** Lee los valores actuales del formulario. */
export function getFormValues() {
    return {
        title: inputTitle.value,
        description: inputDescription.value,
        priority: inputPriority.value
    };
}

/** Pasa el formulario a modo edición con los datos de la tarea. */
export function setEditMode(task) {
    formTitle.textContent = "Editar tarea";
    submitButton.textContent = "Guardar cambios";
    cancelButton.classList.remove("hidden");

    inputTitle.value = task.title;
    inputDescription.value = task.description;
    inputPriority.value = task.priority;
    inputTitle.focus();
}

/** Devuelve el formulario a modo crear y lo limpia. */
export function resetForm() {
    form.reset();
    formTitle.textContent = "Crear nueva tarea";
    submitButton.textContent = "Agregar";
    cancelButton.classList.add("hidden");
}