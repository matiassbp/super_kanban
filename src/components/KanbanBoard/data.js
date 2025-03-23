export const initialData = {
    tasks: {
      'task-1': { id: 'task-1', content: 'Tarea 1', description: 'Descripción de la tarea 1' },
      'task-2': { id: 'task-2', content: 'Tarea 2', description: 'Descripción de la tarea 2' },
      'task-3': { id: 'task-3', content: 'Tarea 3', description: 'Descripción de la tarea 3' }
    },
    columns: {
      'todo': { id: 'todo', title: 'Pendientes', taskIds: ['task-1', 'task-2'] },
      'in-progress': { id: 'in-progress', title: 'En Progreso', taskIds: [] },
      'done': { id: 'done', title: 'Finalizadas', taskIds: ['task-3'] }
    },
    columnOrder: ['todo', 'in-progress', 'done']
  };
  
  // Esta función maneja la lógica de mover tareas entre columnas
  export const moveTask = (data, source, destination, draggableId) => {
    if (!destination) return data;
  
    const sourceColumn = data.columns[source.droppableId];
    const destColumn = data.columns[destination.droppableId];
    
    if (sourceColumn === destColumn) {
      const newTaskIds = [...sourceColumn.taskIds];
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
  
      return {
        ...data,
        columns: { 
          ...data.columns, 
          [sourceColumn.id]: { ...sourceColumn, taskIds: newTaskIds } 
        }
      };
    } else {
      const sourceTaskIds = [...sourceColumn.taskIds];
      sourceTaskIds.splice(source.index, 1);
      
      const destTaskIds = [...destColumn.taskIds];
      destTaskIds.splice(destination.index, 0, draggableId);
      
      return {
        ...data,
        columns: {
          ...data.columns,
          [sourceColumn.id]: { ...sourceColumn, taskIds: sourceTaskIds },
          [destColumn.id]: { ...destColumn, taskIds: destTaskIds }
        }
      };
    }
  };
  
  // Esta función genera una nueva tarea
  export const createTask = (data, columnId, content, description) => {
    const newTaskId = `task-${Object.keys(data.tasks).length + 1}`;
    const newTask = { id: newTaskId, content, description };
  
    return {
      ...data,
      tasks: { ...data.tasks, [newTaskId]: newTask },
      columns: {
        ...data.columns,
        [columnId]: {
          ...data.columns[columnId],
          taskIds: [...data.columns[columnId].taskIds, newTaskId]
        }
      }
    };
  };