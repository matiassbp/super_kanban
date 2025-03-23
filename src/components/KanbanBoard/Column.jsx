import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import TaskCard from './TaskCard';

const Column = ({ column, tasks, onTaskClick, onAddClick }) => {
  return (
    <div className="col-md-4 column-wrapper">
      <h4 className="text-center text-white">{column.title}</h4>
      <button 
        className="btn btn-primary w-100 mb-2" 
        onClick={() => onAddClick(column.id)}
      >
        + Agregar Tarea
      </button>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div 
            ref={provided.innerRef} 
            {...provided.droppableProps} 
            className="column-container"
          >
            {column.taskIds.map((taskId, index) => {
              const task = tasks[taskId];
              return (
                <TaskCard 
                  key={task.id} 
                  task={task} 
                  index={index} 
                  onClick={onTaskClick} 
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;