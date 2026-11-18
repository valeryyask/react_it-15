// src/components/AddAgentForm.jsx — ДОБАВЛЕНИЕ РИЕЛТОРА.
// Универсальную форму EntityForm подключаем к слайсу agents.

import { useDispatch, useSelector } from "react-redux";
import { addAgent, selectIsAddingAgent } from "../store/agentsSlice";
import EntityForm from "./EntityForm";

const AGENT_FIELDS = [
  { name: "name", label: "Имя риелтора" },
  { name: "agency", label: "Агентство / Отдел" },
  { name: "city", label: "Город" },
  { name: "phone", label: "Телефон" },
  { name: "email", label: "Email" },
];

export default function AddAgentForm() {
  const dispatch = useDispatch();
  const isAdding = useSelector(selectIsAddingAgent);

  const handleSubmit = (values) => dispatch(addAgent(values)).unwrap();

  return (
    <EntityForm
      fields={AGENT_FIELDS}
      onSubmit={handleSubmit}
      loading={isAdding}
    />
  );
}
