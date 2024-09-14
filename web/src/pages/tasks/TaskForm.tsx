import { FC, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { TaskService } from "../../services";
import { Task } from "../../types";

type Props = {
  value?: Task;
  show: boolean;
  onClose: () => void;
  onSave: () => void;
};

const InitialValue = {
  id: "",
  description: "",
  position: 0,
  completed: false,
};

const TaskForm: FC<Props> = ({ value, show, onClose, onSave }) => {
  const [task, setTask] = useState<Task>(InitialValue);

  useEffect(() => {
    setTask(value || InitialValue);
  }, [value]);

  const handleSave = () =>
    TaskService.save(task).then(() => {
      setTask(InitialValue);
      onSave();
    });

  return (
    <Modal
      show={show}
      onHide={onClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{value ? "Edit Task" : "New Task"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Control
            type="text"
            placeholder="Enter description"
            value={task.description}
            onChange={(event) => {
              setTask((prev) => ({
                ...prev,
                description: event.target.value,
              }));
            }}
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskForm;
