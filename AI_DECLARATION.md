# Declaración de uso de IA

## 1. Herramientas de IA utilizadas y momentos
- ChatGpt: Elección de la técnica (módulos ES6), Arquitectura del proyecto
- Chatgpt: Genero libreria para Storage.
- UXMagic.ai: Diseño para la Interfaz UI 
- Chatgpt: api fue generado por chatgpt
- Chatgpt: task fue generado por chatgpt
- Chatgpt: ui fue generado por chatgpt

## 2. Prompts clave
1. "Me puedes explicar a profundidad la diferencia entre opción A y Opción B"
	"Opción A: Módulos ES6      ||     Opción B: Custom Events"
2. "Qué estructura sería la mejor a utilizar para mantener este proyecto lo más ordenado
    posible en base a la opción A: Módulos ES6"

## 3. Partes con errores o ajustes manuales
1. " Agregué por mi cuenta los campos de descripción, las etiquetas y atributos de accesibilidad en el HTML.
2. " Agruege por mi cuenta el contenido de Readme"
3. " Agregué por mi cuenta un try/catch para manejar errores de escritura en localStorage.
4. " La prueba del modo Offline no funcionó en Phoenix Code (afectaba también al editor); 
	 Así que probe el manejo de errores con una URL incorrecta para provocar un 404. "
5. " Durante la prueba en task se encontraron fallas al momento de generar las tareas, por lo que se asigno
	 una función para que valide el ID antes de la creación y no se duplique. "
6. " En task se agrego de forma manual validatePriority, la comprobación de existencia en updateTask, 
	 toggleTask, y deleteTask para devolver { tasks, deleted }"	 
7. " Se utiliza la base generada para ui y se adapta a las clases ya generadas, se modifica style.css
	 y se cambia showNotification para el mejoramiento de avisos en el API.
