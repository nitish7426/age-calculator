import React, { useState } from "react";
import * as yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import arrow from "./assets/icon-arrow.svg";

const App = () => {
  const year = new Date().getFullYear();
  const [age, setAge] = useState({
    years: 0,
    months: 0,
    days: 0,
  });
  const initialValues = {
    day: "",
    month: "",
    year: "",
  };
  console.log(year);
  const validationSchema = yup.object().shape({
    day: yup
      .number()
      .required("Required")
      .positive("Must be positive")
      .max(31, "Must be a valid day"),
    month: yup
      .number()
      .required("Required")
      .positive("Must be positive")
      .max(12, "Must be a valid month"),
    year: yup
      .number()
      .required("Required")
      .positive("Must be positive")
      .max(year, "Must be in the past"),
  });

  const calculateAge = (years: number, months: number, days: number) => {
    console.log(years, days, months);
    const today = new Date();
    let calculated_age = {
      years: 0,
      months: 0,
      days: 0,
    };

    calculated_age.years = today.getFullYear() - years;
    calculated_age.months = today.getMonth() - months;
    calculated_age.days = today.getDay() - days;

    const total_days =
      calculated_age.years * 365 +
      calculated_age.months * 12 +
      calculated_age.days;
    console.log(total_days);

    if (calculated_age.months < 0) {
      calculated_age.years = calculated_age.years - 1;
      calculated_age.months = 12 + calculated_age.months;
    }

    if (calculated_age.days < 0) {
      calculated_age.months = calculated_age.months - 1;
      calculated_age.days = 31 + calculated_age.days;
    }

    return calculated_age;
  };

  type Event = {
    years: number;
    months: number;
    days: number;
  };

  const handleSubmit = (e: any) => {
    console.log("submitted");
    const { years, months, days } = calculateAge(e.year, e.month, e.day);
    setAge({ years, months, days });
  };

  const inputFields = [
    {
      id: 1,
      name: "day",
      placeholder: "DD",
    },
    {
      id: 2,
      name: "month",
      placeholder: "MM",
    },
    {
      id: 3,
      name: "year",
      placeholder: "YYYY",
    },
  ];
  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-1 p-4">
      <div className="bg-white w-full px-6 py-12 rounded-3xl rounded-br-[5rem] space-y-6 max-w-lg">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="w-full space-y-6">
            <div className="flex gap-4">
              {inputFields.map((value) => (
                <div className="flex flex-col space-y-2" key={value.id}>
                  <label
                    className="text-xs uppercase tracking-[0.3em] font-bold text-neutral-3"
                    htmlFor={value.name}
                  >
                    {value.name}
                  </label>

                  <Field
                    className="border w-full outline-none border-neutral-2 py-2 px-4 text-lg font-bold text-neutral-4 rounded-md placeholder:text-neutral-3"
                    name={value.name}
                    placeholder={value.placeholder}
                    type="text"
                  />
                  <p className="empty:hidden text-xs text-primary-2 italic">
                    <ErrorMessage name={value.name} />
                  </p>
                </div>
              ))}
            </div>
            {/* Button and divider */}
            <div className="flex items-center">
              <div className="h-[1px] bg-neutral-2 w-full" />
              <button
                className="bg-primary-1 p-4 rounded-full flex-shrink-0 hover:bg-primary-1/90 transition-colors duration-200"
                type="submit"
                aria-label="submit"
              >
                <img className="h-6 w-6" src={arrow} alt="" />
              </button>
              <div className="w-full h-[1px] bg-neutral-2 md:hidden" />
            </div>
          </Form>
        </Formik>
        {/* age */}
        <div className="text-5xl font-black italic">
          <p className="space-x-2">
            <span className="text-primary-1">{age.years || "--"}</span>
            <span>years</span>
          </p>
          <p className="space-x-2">
            <span className="text-primary-1">{age.months || "--"}</span>
            <span>months</span>
          </p>
          <p className="space-x-2">
            <span className="text-primary-1">{age.days || "--"}</span>
            <span>days</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;
