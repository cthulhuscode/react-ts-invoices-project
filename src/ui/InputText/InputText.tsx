import { useState } from "react";
import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import "./InputText.scss";

interface InputTextProps {
  classes: string;
  label: string;
  value: string;
  name: string;
  setState: Dispatch<SetStateAction<string>>;
  setInputHasError: Dispatch<SetStateAction<boolean>>;
}

export const InputText = ({
  classes,
  name,
  label,
  setState,
  value,
  setInputHasError,
}: InputTextProps) => {
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setInputHasError(true);
      setError(true);
    } else {
      setInputHasError(false);
      setError(false);
    }

    setState(e.target.value);
  };

  const [error, setError] = useState(false);

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
        onChange={handleOnChange}
      />
    </div>
  );
};
