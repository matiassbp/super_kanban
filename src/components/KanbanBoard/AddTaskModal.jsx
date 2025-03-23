import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddTaskModal = ({ 
  show, 
  onHide, 
  taskText, 
  taskDescription, 
  onTaskTextChange, 
  onTaskDescriptionChange, 
  onAddTask 
}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nueva Tarea</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="taskName">
            <Form.Label>Nombre de la tarea</Form.Label>
            <Form.Control 
              type="text" 
              value={taskText} 
              onChange={(e) => onTaskTextChange(e.target.value)} 
            />
          </Form.Group>
          <Form.Group controlId="taskDescription" className="mt-2">
            <Form.Label>Descripción</Form.Label>
            <Form.Control 
              as="textarea" 
              rows={3} 
              value={taskDescription} 
              onChange={(e) => onTaskDescriptionChange(e.target.value)} 
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancelar</Button>
        <Button variant="primary" onClick={onAddTask}>Agregar</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddTaskModal;