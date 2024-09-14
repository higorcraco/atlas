import { FC } from "react";
import { Button } from "react-bootstrap";
import { BsPlus } from "react-icons/bs";

type Props = {
  onClick: () => void;
};

const Fab: FC<Props> = ({ onClick }) => (
  <Button
    variant="primary"
    className="fab-button position-fixed rounded-circle"
    style={{
      bottom: "20px",
      right: "20px",
      width: "60px",
      height: "60px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "24px",
    }}
    onClick={onClick}
  >
    <BsPlus />
  </Button>
);

export default Fab;
