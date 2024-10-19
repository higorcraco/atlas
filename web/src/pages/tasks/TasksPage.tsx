import { useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Container, Row } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import Checkbox from "../../components/Checkbox";
import Fab from "../../components/FAB";
import FormatDate, { DateFormatType } from "../../components/FormatDate";
import Panel from "../../components/Panel";
import RoundButton from "../../components/RoundButton";
import { Table, TableColumn } from "../../components/table/Table";
import { TaskService } from "../../services";
import { Task } from "../../types";
import TaskForm from "./TaskForm";
import { CompletedStatusEnum, completedStatusEnumFormated } from "./TaskUtils";

const TasksPage = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<Task | undefined>(undefined);

  useEffect(() => {
    doSearch("completed=='false'");
  }, []);

  const doSearch = (search?: string) =>
    TaskService.findAll(search, "position").then(({ data }) => {
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
    doSearch();
    closeForm();
  };

  const onDelete = (task: Task) => {
    TaskService.deleteById(task.id!).finally(() => doSearch());
  };

  const onUpdateCompleted = (task: Task) => {
    TaskService.save({ ...task, completed: !task.completed }).then(() =>
      doSearch()
    );
  };

  const onChangeCompletedStatus = (completedStatus: CompletedStatusEnum) => {
    let search = "";

    if (completedStatus !== CompletedStatusEnum.ALL) {
      search = `completed=='${
        completedStatus === CompletedStatusEnum.COMPLETED ? "true" : "false"
      }'`;
    }

    doSearch(search);
  };

  const renderCompletedStatusButtons = () =>
    Object.values(CompletedStatusEnum).map((value) => (
      <Button variant="primary" onClick={() => onChangeCompletedStatus(value)}>
        {completedStatusEnumFormated[value]}
      </Button>
    ));

  const getColumns = (): TableColumn<Task>[] => [
    {
      header: "Task",
      column: (task) => `${task.id} - ${task.title}`,
      onClick: onEdit,
    },
    {
      header: "Date",
      column: (task) => (
        <FormatDate
          date={task.auditInfo?.createdDate}
          type={DateFormatType.TIMESTAMP}
        />
      ),
    },
    {
      header: "Completed",
      column: (task) => (
        <Checkbox
          id={`completed-${task.id}`}
          checked={task.completed}
          onChange={() => onUpdateCompleted(task)}
        />
      ),
      align: "center",
    },
    {
      header: "",
      column: (task) => (
        <RoundButton variant="light" onClick={() => onDelete(task)}>
          <BsTrash size={14} />
        </RoundButton>
      ),
    },
  ];

  return (
    <Container>
      <Row>
        <Col>
          <ButtonGroup>{renderCompletedStatusButtons()}</ButtonGroup>
        </Col>
      </Row>
      <Panel table>
        <Table<Task>
          data={taskList}
          keyExtractor={(task) => task.id}
          columns={getColumns()}
        ></Table>
      </Panel>

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
