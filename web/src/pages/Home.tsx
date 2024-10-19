import { Col, Container, Row } from "react-bootstrap";

const Home = () => {
  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <Row className="mt-3">
            <Col>
              <h2 className="lastica-font">Atlas</h2>
            </Col>
          </Row>
          <Row className="mt-5">
            <h1 className="lastica-font">PERSONAL DEVELOPMENT PROJECT</h1>
          </Row>
          <Row>
            <p>All I want to learn I develop here.</p>
          </Row>
        </Col>
        <Col md={6}></Col>
      </Row>
    </Container>
  );
};

export default Home;
