import React from 'react';
import { Draggable } from '@hello-pangea/dnd';

const TaskCard = ({ task, index, onClick }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div 
          ref={provided.innerRef} 
          {...provided.draggableProps} 
          {...provided.dragHandleProps} 
          className="task-card" 
          onClick={() => onClick(task)}
        >
          <strong>{task.content}</strong>
          <p className="task-description">{task.description}</p>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;