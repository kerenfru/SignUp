import React, { FC } from "react";
import { Select as SelectAnt } from "antd";
import styles from "./Select.module.scss";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  id: string;
  placeholder: string;
  onChange: (key: string, value: string) => void;
  options: SelectOption[];
  loading?: boolean;
  error?: string | undefined;
}

const Select: FC<SelectProps> = ({
  id,
  placeholder,
  onChange,
  options,
  loading,
  error,
}) => (
  <div className={styles.Select} data-testid="Select">
    <SelectAnt
      id={id}
      placeholder={placeholder}
      onChange={(value) => onChange(id, value)}
      options={options}
      loading={loading}
      disabled={loading}
      status={error ? "error" : ""}
      style={{ width: "100%" }}
    />
    {error && <p className={styles.error}>{error}</p>}
  </div>
);

export default Select;
