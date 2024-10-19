import { faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import Sidebar from "./sidebar/Sidebar";

const NavbarApp = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark" sticky="top">
        <Container>
          <Navbar.Brand
            onClick={() => setShowSidebar((prev) => !prev)}
            style={{ cursor: "pointer" }}
            className="logo-color lastica-font"
          >
            <FontAwesomeIcon
              icon={faEarthAmericas}
              style={{ marginRight: "0.5em" }}
            />
            Atlas
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Sidebar visible={showSidebar} onVisibilityChange={setShowSidebar} />
    </>
  );
};

export default NavbarApp;
