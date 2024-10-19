import { useEffect, useState } from "react";
import { Container, Form, Row } from "react-bootstrap";
import Panel from "../../components/Panel";
import { Table, TableColumn } from "../../components/table/Table";
import { UserService } from "../../services";
import { User } from "../../types";

const UsersPage = () => {
  const [userList, setUserList] = useState<User[]>([]);

  useEffect(() => {
    UserService.findAll().then(({ data }) => setUserList(data));
  }, []);

  const doNothing = () => {
    console.log("Nothing done");
  };

  const getColumns = (): TableColumn<User>[] => {
    return [
      {
        header: "Username",
        column: (user) => user.username,
      },
      {
        header: "Account Expired",
        column: (user) => (
          <Form.Check
            type="checkbox"
            checked={!user.isAccountNonExpired}
            onChange={doNothing}
          />
        ),
        align: "center",
      },
      {
        header: "Account Locked",
        column: (user) => (
          <Form.Check
            type="checkbox"
            checked={!user.isAccountNonLocked}
            onChange={doNothing}
          />
        ),
        align: "center",
      },
      {
        header: "Credentials Expired",
        column: (user) => (
          <Form.Check
            type="checkbox"
            checked={!user.isCredentialsNonExpired}
            onChange={doNothing}
          />
        ),
        align: "center",
      },
      {
        header: "Enabled",
        column: (user) => (
          <Form.Check
            type="checkbox"
            checked={!user.isEnabled}
            onChange={doNothing}
          />
        ),
        align: "center",
      },
    ];
  };

  return (
    <Container>
      <Row>
        <Panel table>
          <Table<User>
            data={userList}
            columns={getColumns()}
            keyExtractor={(user) => user.username}
          />
        </Panel>
      </Row>
    </Container>
  );
};

export default UsersPage;
