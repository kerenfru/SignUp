import { FormEvent, useState } from "react";
import { SignUp } from "../components/Form/Form";

export interface Validation {
  [key: string]: {
    required: { value: boolean; errorMsg: string };
    regex?: { value: string; errorMsg: string };
  };
}

export const useForm = (
  validation: Validation,
  onSubmit: (data: SignUp) => void
) => {
  const [data, setData] = useState<Partial<Record<keyof SignUp, string>>>({});
  const [errors, setErrors] = useState<Partial<Record<keyof SignUp, string>>>(
    {}
  );

  const onChange = (key: string, value: string) => {
    setData({ ...data, ...{ [key]: value } });
  };

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newErrors: Partial<Record<keyof SignUp, string>> = {};
    for (const key in validation) {
      const value = data[key as keyof SignUp];

      if (validation[key].required.value && !value) {
        newErrors[key as keyof SignUp] = validation[key].required.errorMsg;
        continue;
      }

      const rgx = validation[key].regex;
      if (value && rgx && !RegExp(rgx.value).test(value)) {
        newErrors[key as keyof SignUp] = rgx.errorMsg;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      onSubmit(data as SignUp);
    }
  };

  return { errors, onChange, submitForm };
};
