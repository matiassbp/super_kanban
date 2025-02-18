import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
import { Modal, Button, Form } from 'react-bootstrap';

const initialData = {
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

const KanbanBoard = () => {
  const [data, setData] = useState(initialData);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentColumn, setCurrentColumn] = useState(null);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const sourceColumn = data.columns[source.droppableId];
    const destColumn = data.columns[destination.droppableId];
    
    if (sourceColumn === destColumn) {
      const newTaskIds = [...sourceColumn.taskIds];
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      setData({
        ...data,
        columns: { ...data.columns, [sourceColumn.id]: { ...sourceColumn, taskIds: newTaskIds } }
      });
    } else {
      const sourceTaskIds = [...sourceColumn.taskIds];
      sourceTaskIds.splice(source.index, 1);
      
      const destTaskIds = [...destColumn.taskIds];
      destTaskIds.splice(destination.index, 0, draggableId);
      
      setData({
        ...data,
        columns: {
          ...data.columns,
          [sourceColumn.id]: { ...sourceColumn, taskIds: sourceTaskIds },
          [destColumn.id]: { ...destColumn, taskIds: destTaskIds }
        }
      });
    }
  };

  const openModal = (columnId) => {
    setCurrentColumn(columnId);
    setModalOpen(true);
  };

  const addTask = () => {
    if (!newTaskText.trim()) return;
  
    const newTaskId = `task-${Object.keys(data.tasks).length + 1}`;
    const newTask = { id: newTaskId, content: newTaskText, description: newTaskDescription };
  
    setData((prevData) => ({
      ...prevData,
      tasks: { ...prevData.tasks, [newTaskId]: newTask },
      columns: {
        ...prevData.columns,
        [currentColumn]: {
          ...prevData.columns[currentColumn],
          taskIds: [...prevData.columns[currentColumn].taskIds, newTaskId]
        }
      }
    }));
  
    setNewTaskText('');
    setNewTaskDescription('');
    setModalOpen(false);
  };
  

  return (
    <div className="kanban-container">
      <h2 className="text-center text-white">Tablero Kanban</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="row">
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            return (
              <div key={column.id} className="col-md-4 column-wrapper">
                <h4 className="text-center text-white">{column.title}</h4>
                <button className="btn btn-primary w-100 mb-2" onClick={() => openModal(column.id)}>+ Agregar Tarea</button>
                <Droppable droppableId={column.id}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps} className="column-container">
                      {column.taskIds.map((taskId, index) => {
                        const task = data.tasks[taskId];
                        return (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided) => (
                              <div 
                              ref={provided.innerRef} 
                              {...provided.draggableProps} 
                              {...provided.dragHandleProps} 
                              className="task-card" 
                              onClick={() => setSelectedTask(task)}
                            >
                              <strong>{task.content}</strong>
                              <p className="task-description">{task.description}</p>
                            </div>
                            
                            )}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>

      {/* Modal para agregar tarea */}
      <Modal show={modalOpen} onHide={() => setModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Agregar Nueva Tarea</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form>
  <Form.Group controlId="taskName">
    <Form.Label>Nombre de la tarea</Form.Label>
    <Form.Control type="text" value={newTaskText} onChange={(e) => setNewTaskText(e.target.value)} />
  </Form.Group>
  <Form.Group controlId="taskDescription" className="mt-2">
    <Form.Label>Descripción</Form.Label>
    <Form.Control as="textarea" rows={3} value={newTaskDescription} onChange={(e) => setNewTaskDescription(e.target.value)} />
  </Form.Group>
</Form>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancelar</Button>
          <Button variant="primary" onClick={addTask}>Agregar</Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para ver detalles de la tarea */}
      {selectedTask && (
        <Modal show={!!selectedTask} onHide={() => setSelectedTask(null)}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedTask.content}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{selectedTask.description}</Modal.Body>
        </Modal>
      )}
    </div>
  );
};

export default KanbanBoard;
