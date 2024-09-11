import { Button, Card } from "react-bootstrap";
import { alertError } from "../config/Notification";

const Home = () => {
  return (
    <>
      <h1>Home, Sweet Home</h1>
      <Card>
        <p>You finally logged in</p>
      </Card>
      <Button onClick={() => alertError("teste")}>teste</Button>
    </>
  );
};

export default Home;
