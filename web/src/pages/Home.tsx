import { Button, Col, Row } from "react-bootstrap";
import { useAuth } from "../config/AuthContext";
import { alertError } from "../config/Notification";

const Home = () => {
  const { refreshToken, setLoggedUser, loggedUser } = useAuth();

  const handleExpiredRefreshToken = async () => {
    const actualLoggedUser = { ...loggedUser };

    setLoggedUser({
      username: "master",
      acessToken:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYXN0ZXIiLCJyb2xlcyI6WyJBRE1JTiIsIkNPTU1PTl9VU0VSIiwiTUFOQUdFUiJdLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAiLCJleHAiOjE3MjQ0MzEzMzUsImlhdCI6MTcyNDQyNzczNX0.fjaEOWMN8m0zfecOA6myoLWir2mp60bOxsZRMz9QYkY",
      refreshToken:
        "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtYXN0ZXIiLCJyb2xlcyI6WyJBRE1JTiIsIkNPTU1PTl9VU0VSIiwiTUFOQUdFUiJdLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwODAiLCJleHAiOjE3MjQ0MzEzMzUsImlhdCI6MTcyNDQyNzczNX0.fjaEOWMN8m0zfecOA6myoLWir2mp60bOxsZRMz9QYkY",
    });

    try {
      await refreshToken();
    } finally {
      setLoggedUser(actualLoggedUser);
    }
  };

  return (
    <>
      <Row>
        <h1>Welcome to Atlas Home</h1>
      </Row>
      <Row className="mt-5">
        <Col>
          <Button onClick={() => alertError("teste")}>
            Notification Error Test
          </Button>
        </Col>
        <Col>
          <Button onClick={handleExpiredRefreshToken}>
            Expired Refresh Token
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default Home;
