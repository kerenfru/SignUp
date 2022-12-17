import { Button, Typography, Result } from "antd";
import React, { FC, useEffect, useState } from "react";
import { useForm, Validation } from "../../hooks/useForm";
import { getCities, getUSAStates } from "../../services/locations";
import Input from "../Input/Input";
import Select, { SelectOption } from "../Select/Select";
import styles from "./Form.module.scss";

interface FormProps {}

export interface SignUp {
  fname: string;
  lname: string;
  state: string;
  city: string;
  email: string;
  pass: string;
}

const { Title } = Typography;

const Form: FC<FormProps> = () => {
  const [state, setState] = useState<string>("");
  const [cities, setCities] = useState<SelectOption[]>([]);
  const [countries, setCountries] = useState<SelectOption[]>([]);
  const [citiesLoading, setCitiesLoading] = useState<boolean>(false);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState<boolean | null>(null);

  const validation: Validation = {
    fname: {
      required: { value: true, errorMsg: "First Name is required" },
      regex: {
        value: "^[A-Za-z]*$",
        errorMsg: "First Name should contain only alphabetic characters",
      },
    },
    lname: {
      required: { value: true, errorMsg: "Last Name is required" },
      regex: {
        value: "^[A-Za-z]*$",
        errorMsg: "Last Name should contain only alphabetic characters",
      },
    },
    state: {
      required: { value: true, errorMsg: "State is required" },
    },
    city: {
      required: { value: true, errorMsg: "City is required" },
    },
    email: {
      required: { value: true, errorMsg: "Email is required" },
      regex: {
        value: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        errorMsg: "Email should be valid",
      },
    },
    pass: {
      required: { value: true, errorMsg: "Password is required" },
      regex: {
        value: "^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,}$",
        errorMsg:
          "Password should contain at least one number, one special character and min 6 characters",
      },
    },
  };

  const onSubmit = (data: SignUp) => {
    console.log("submitted!", data);
    setIsSubmitSuccess(true);
  };

  const { errors, onChange, submitForm } = useForm(validation, onSubmit);

  useEffect(() => {
    const fetchData = async () => {
      const statesData: { state_name: string }[] = await getUSAStates();
      setCountries(
        statesData.map(({ state_name }) => {
          return { label: state_name, value: state_name };
        })
      );
    };

    fetchData().catch(() => {
      setIsSubmitSuccess(false);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const citiesData: { city_name: string }[] = await getCities(state);
      setCities(
        citiesData.map(({ city_name }) => {
          return { label: city_name, value: city_name };
        })
      );
      setCitiesLoading(false);
    };

    if (state) {
      fetchData().catch(() => {
        setIsSubmitSuccess(false);
      });
    }
  }, [state]);

  const handleStateChange = (id: string, value: string) => {
    setCitiesLoading(true);
    setState(value);
    onChange(id, value);
  };

  return (
    <>
      <div className={styles.Form} data-testid="Form">
        {isSubmitSuccess === null ? (
          <>
            <Title className={styles.Title} level={3}>
              Sign Up
            </Title>
            <form onSubmit={submitForm} className={styles.Flex}>
              <Input
                id="fname"
                placeholder="First Name"
                onChange={onChange}
                error={errors.fname}
              />
              <Input
                id="lname"
                placeholder="Last Name"
                onChange={onChange}
                error={errors.lname}
              />
              <Select
                id="state"
                placeholder="Select State"
                onChange={handleStateChange}
                options={countries}
                error={errors.state}
              />
              <Select
                id="city"
                placeholder="Select City"
                onChange={onChange}
                options={cities}
                loading={citiesLoading}
                error={errors.city}
              />
              <Input
                id="email"
                placeholder="Email"
                onChange={onChange}
                error={errors.email}
              />
              <Input
                id="pass"
                type="password"
                placeholder="Password"
                onChange={onChange}
                error={errors.pass}
              />
              <Button
                className={styles.Submit}
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </form>
          </>
        ) : (
          <Result
            className={styles.Result}
            status={isSubmitSuccess ? "success" : "error"}
            title={
              isSubmitSuccess
                ? "Congratulations, your account has been successfully created."
                : "Sorry, something went wrong."
            }
          />
        )}
      </div>
      {isSubmitSuccess &&
        [...Array(10)].map((e, i) => (
          <div key={i} className={styles.Confetti} />
        ))}
    </>
  );
};

export default Form;
