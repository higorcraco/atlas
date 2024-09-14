import { FC } from "react";

type Props = {
  checked: boolean;
  label?: string;
  onChange?: () => void;
  id?: string;
};

const Checkbox: FC<Props> = ({ checked, onChange, label, id = "checkbox" }) => (
  <div>
    <input
      id={id}
      type="checkbox"
      className="form-check-input"
      style={{ cursor: "pointer" }}
      checked={checked}
      onChange={onChange}
    ></input>
    {label && <label htmlFor="other"> label </label>}
  </div>
);

export default Checkbox;
