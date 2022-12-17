import React, { FC } from "react";
import { Input as InputAnt } from "antd";
import styles from "./Input.module.scss";

interface InputProps {
  id: string;
  placeholder: string;
  onChange: (key: string, value: string) => void;
  error?: string | undefined;
  type?: "text" | "password";
}

const Input: FC<InputProps> = ({ id, placeholder, onChange, error, type }) => (
  <div className={styles.Input} data-testid="Input">
    <InputAnt
      id={id}
      placeholder={placeholder}
      status={error ? "error" : ""}
      onChange={(e) => onChange(id, e.target.value)}
      {...(type ? { type: type } : {})}
    />
    {error && <p className={styles.error}>{error}</p>}
  </div>
);

export default Input;
