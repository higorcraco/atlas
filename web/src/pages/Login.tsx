import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { User } from "../domain/User";
import { login } from "../services/AuthService";

const Login = () => {
  const [user, setUser] = useState<User>({});

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    login(user.username!, user.password!);
  };

  return (
    <Card>
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={user.username}
                  onChange={(event) =>
                    setUser((prev) => ({
                      ...prev,
                      username: event.target.value,
                    }))
                  }
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={user.password}
                  onChange={(event) =>
                    setUser((prev) => ({
                      ...prev,
                      password: event.target.value,
                    }))
                  }
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Card>
  );
};

export default Login;
