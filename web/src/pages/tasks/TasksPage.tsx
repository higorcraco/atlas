import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { BsPencil, BsTrash } from "react-icons/bs";
import Checkbox from "../../components/Checkbox";
import Fab from "../../components/FAB";
import RoundButton from "../../components/RoundButton";
import { TaskService } from "../../services";
import { Task } from "../../types";
import TaskForm from "./TaskForm";

const TasksPage = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<Task | undefined>(undefined);

  useEffect(() => {
    search();
  }, []);

  const search = () =>
    TaskService.findAll("position").then(({ data }) => {
      console.log("data", data);
      setTaskList(data.content);
    });

  const onAdd = () => {
    setShowForm(true);
  };

  const onEdit = (task: Task) => {
    setEditTask(task);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditTask(undefined);
  };

  const onSave = () => {
    search();
    closeForm();
  };

  const onDelete = (task: Task) => {
    TaskService.deleteById(task.id).finally(() => search());
  };

  const onUpdateCompleted = (task: Task) => {
    TaskService.save({ ...task, completed: !task.completed }).then(() =>
      search()
    );
  };

  const renderTask = (task: Task) => (
    <tr>
      <td>
        {task.position} - {task.description}
      </td>
      <td className="text-center">
        <Checkbox
          id={`completed-${task.id}`}
          checked={task.completed}
          onChange={() => onUpdateCompleted(task)}
        />
      </td>
      <td
        style={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <RoundButton variant="light" onClick={() => onEdit(task)}>
          <BsPencil size={14} />
        </RoundButton>
        <RoundButton variant="light" onClick={() => onDelete(task)}>
          <BsTrash size={14} />
        </RoundButton>
      </td>
    </tr>
  );

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>Description</th>
            <th className="text-center">Completed</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{taskList.map(renderTask)}</tbody>
      </Table>

      <TaskForm
        show={showForm}
        onClose={closeForm}
        onSave={onSave}
        value={editTask}
      />

      <Fab onClick={onAdd} />
    </Container>
  );
};

export default TasksPage;
