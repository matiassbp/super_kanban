import React, { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

import Column from './Column';
import AddTaskModal from './AddTaskModal';
import TaskDetailModal from './TaskDetailModal';
import { initialData, moveTask, createTask } from './data';

const KanbanBoard = () => {
  const [data, setData] = useState(initialData);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentColumn, setCurrentColumn] = useState(null);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    const newData = moveTask(data, source, destination, draggableId);
    if (newData !== data) {
      setData(newData);
    }
  };

  const openModal = (columnId) => {
    setCurrentColumn(columnId);
    setModalOpen(true);
  };

  const addTask = () => {
    if (!newTaskText.trim()) return;
  
    setData(createTask(data, currentColumn, newTaskText, newTaskDescription));
    setNewTaskText('');
    setNewTaskDescription('');
    setModalOpen(false);
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  return (
    <div className="kanban-container">
      <h2 className="text-center text-white">Tablero Kanban</h2>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="row">
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            return (
              <Column
                key={column.id}
                column={column}
                tasks={data.tasks}
                onTaskClick={handleTaskClick}
                onAddClick={openModal}
              />
            );
          })}
        </div>
      </DragDropContext>

      <AddTaskModal
        show={modalOpen}
        onHide={() => setModalOpen(false)}
        taskText={newTaskText}
        taskDescription={newTaskDescription}
        onTaskTextChange={setNewTaskText}
        onTaskDescriptionChange={setNewTaskDescription}
        onAddTask={addTask}
      />

      <TaskDetailModal
        task={selectedTask}
        onHide={() => setSelectedTask(null)}
      />
    </div>
  );
};

export default KanbanBoard;