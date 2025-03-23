# Tablero Kanban

Un tablero Kanban interactivo construido con React que permite organizar tareas en columnas (Pendientes, En Progreso, Finalizadas) y arrastrarlas entre ellas.

## Características

- Interfaz drag and drop para mover tareas entre columnas
- Creación de nuevas tareas con título y descripción
- Vista detallada de tareas
- Diseño responsivo
- Animaciones visuales al interactuar con las tareas

## Tecnologías utilizadas

- React
- @hello-pangea/dnd (fork de react-beautiful-dnd) para funcionalidad drag and drop
- React Bootstrap para componentes de UI
- CSS personalizado

## Estructura del proyecto

```
src/
├── components/
│   ├── KanbanBoard/
│   │   ├── index.jsx                # Componente principal que integra todo
│   │   ├── data.js                  # Datos iniciales y funciones de manejo de datos
│   │   ├── TaskCard.jsx             # Componente para cada tarea
│   │   ├── Column.jsx               # Componente para cada columna
│   │   ├── AddTaskModal.jsx         # Modal para agregar tareas
│   │   ├── TaskDetailModal.jsx      # Modal para ver detalles de tareas
│   │   └── styles.css               # Estilos compartidos
```

## Instalación

1. Clona este repositorio
2. Instala las dependencias:

```bash
npm install
```

3. Inicia el servidor de desarrollo:

```bash
npm run dev
```

## Dependencias principales

- React
- @hello-pangea/dnd
- Bootstrap
- React-Bootstrap

## Uso

- Para crear una nueva tarea, haz clic en el botón "Agregar Tarea" en la columna deseada
- Para mover una tarea, arrástrala a la columna deseada
- Para ver los detalles de una tarea, haz clic en ella
