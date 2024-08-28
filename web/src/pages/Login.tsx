import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useAuth } from "../config/AuthContext";
import { AuthService } from "../services";
import { User } from "../types/User";

const Login = () => {
  const [user, setUser] = useState<User>({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loggedUser, setLoggedUser } = useAuth();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    AuthService.login(user.username!, user.password!).then(({ data }) => {
      localStorage.setItem("token", data.acessToken);
      localStorage.setItem("refreshToken", data.refreshToken);
      setLoggedUser({ username: data.username });
    });
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
