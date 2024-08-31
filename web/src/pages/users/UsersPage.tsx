import { useEffect, useState } from "react";
import { Container, Form, Row, Table } from "react-bootstrap";
import { UserService } from "../../services";
import { User } from "../../types";

const UsersPage = () => {
  const [userList, setUserList] = useState<User[]>([]);

  useEffect(() => {
    UserService.findAll().then(({ data }) => setUserList(data));
  }, []);

  const getUserRow = (user: User) => {
    return (
      <tr>
        <td>{user.username}</td>
        <td className="text-center">
          <Form.Check type="checkbox" checked={!user.isAccountNonExpired} />
        </td>
        <td className="text-center">
          <Form.Check type="checkbox" checked={!user.isAccountNonLocked} />
        </td>
        <td className="text-center">
          <Form.Check type="checkbox" checked={!user.isCredentialsNonExpired} />
        </td>
        <td className="text-center">
          <Form.Check type="checkbox" checked={!user.isEnabled} />
        </td>
      </tr>
    );
  };

  return (
    <Container>
      <Row>
        <Table>
          <thead>
            <tr>
              <th>Username</th>
              <th>Account Expired</th>
              <th>Account Locked</th>
              <th>Credentials Expired</th>
              <th>Enabled</th>
            </tr>
          </thead>
          <tbody>{userList.map((user) => getUserRow(user))}</tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default UsersPage;
