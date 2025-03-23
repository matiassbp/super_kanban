import React from 'react';
import { Modal } from 'react-bootstrap';

const TaskDetailModal = ({ task, onHide }) => {
  if (!task) return null;
  
  return (
    <Modal show={!!task} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{task.content}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{task.description}</Modal.Body>
    </Modal>
  );
};

export default TaskDetailModal;