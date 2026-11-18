// src/pages/AgentsPage.jsx — ВТОРАЯ ФОРМА: риелторы / агенты.
// Устроена аналогично странице объектов и переиспользует те же компоненты:
//   AsyncContent, ErrorMessage, StatsBar, LoadingButton/DeleteButton.
// Таблица построена на библиотеке TanStack Table.

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAgents,
  selectAgents,
  selectAgentsStatus,
  selectAgentsError,
  selectAgentsOperationError,
  selectAgentsStats,
} from "../store/agentsSlice";
import AsyncContent from "../components/AsyncContent";
import ErrorMessage from "../components/ErrorMessage";
import StatsBar from "../components/StatsBar";
import AddAgentForm from "../components/AddAgentForm";
import AgentsTable from "../components/AgentsTable";

export default function AgentsPage() {
  const dispatch = useDispatch();
  const agents = useSelector(selectAgents);
  const status = useSelector(selectAgentsStatus);
  const error = useSelector(selectAgentsError);
  const operationError = useSelector(selectAgentsOperationError);
  const stats = useSelector(selectAgentsStats);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAgents());
    }
  }, [status, dispatch]);

  return (
    <section className="page">
      <h2>Риелторы</h2>

      {/* Ошибка добавления/удаления */}
      <ErrorMessage message={operationError} />

      <AsyncContent
        status={status}
        error={error}
        onRetry={() => dispatch(fetchAgents())}
      >
        <StatsBar
          items={[
            { label: "Риелторов в штате", value: stats.count },
            { label: "Городов присутствия", value: stats.cities },
          ]}
        />
        <AddAgentForm />
        <AgentsTable data={agents} />
      </AsyncContent>
    </section>
  );
}
