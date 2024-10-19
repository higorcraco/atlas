import { FC, ReactElement } from "react";

type Props = {
  children: ReactElement;
  table?: boolean;
};

const Panel: FC<Props> = ({ children, table = false }) => {
  return (
    <div
      style={{
        background: "rgba(255, 255, 255, 0.3)",
        padding: table ? "0" : "0.5em 1em",
        border: "2px solid",
        borderRadius: "0.5em",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
};

export default Panel;
