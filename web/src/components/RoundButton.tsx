import { FC, ReactNode } from "react";
import { Button } from "react-bootstrap";

type RoundButtonProps = {
  children: ReactNode;
  onClick: () => void;
  variant?: string;
  disabled?: boolean;
};

const RoundButton: FC<RoundButtonProps> = ({
  children,
  onClick,
  variant,
  disabled,
}) => (
  <Button
    className="rounded-circle mx-1"
    variant={variant}
    disabled={disabled}
    style={{
      width: "30px",
      height: "30px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 0,
    }}
    onClick={onClick}
  >
    {children}
  </Button>
);

export default RoundButton;
