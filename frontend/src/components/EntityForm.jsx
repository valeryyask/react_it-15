// src/components/EntityForm.jsx — УНИВЕРСАЛЬНАЯ ФОРМА ДОБАВЛЕНИЯ.
// Строится по описанию полей, поэтому подходит для любой сущности.
// Значения полей хранит у себя (useState), наружу отдаёт объект через onSubmit.

import { useId, useState } from "react";
import LoadingButton from "./LoadingButton";

const buildEmpty = (fields) =>
  Object.fromEntries(fields.map((field) => [field.name, ""]));

export default function EntityForm({
  fields,
  onSubmit,
  loading = false,
  submitText = "Добавить",
}) {
  const formId = useId();
  const [values, setValues] = useState(() => buildEmpty(fields));

  const handleChange = (name, value) =>
    setValues((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = (event) => {
    event.preventDefault();

    Promise.resolve(onSubmit(values))
      .then(() => setValues(buildEmpty(fields)))
      .catch(() => {});
  };

  return (
    <form className="entity-form" onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div className="field" key={field.name}>
          <label htmlFor={`${formId}-${field.name}`}>{field.label}</label>
          <input
            id={`${formId}-${field.name}`}
            type={field.type ?? "text"}
            value={values[field.name]}
            onChange={(e) => handleChange(field.name, e.target.value)}
          />
        </div>
      ))}
      <LoadingButton type="submit" className="btn btn-primary" loading={loading}>
        {submitText}
      </LoadingButton>
    </form>
  );
}
