import type { Dispatch, SetStateAction } from "react";
import "./InputText.scss";

interface InputTextProps {
  classes: string;
  label: string;
  setState: Dispatch<SetStateAction<string>>;
  value: string;
  name: string;
  error: boolean;
}

export const InputText = ({
  classes,
  name,
  label,
  error,
  setState,
  value,
}: InputTextProps) => {
  return (
    <div className={`inputT ${error ? "error" : ""} ${classes}`}>
      <div className="inputT__texts">
        <label className="inputT__label" htmlFor={name}>
          {label}
        </label>
        <span className="inputT__error-msg">{"can't be empty"}</span>
      </div>
      <input
        className="inputT__control"
        type="text"
        name={name}
        id={name}
        value={value}
        onChange={(e) => {
          setState(e.target.value);
        }}
      />
    </div>
  );
};
