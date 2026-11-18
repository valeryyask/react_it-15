// src/components/DeleteAgentButton.jsx — удаление риелтора со спиннером на кнопке.
// Работает со слайсом agents.

import { useDispatch, useSelector } from "react-redux";
import {
  deleteAgent,
  selectIsAgentDeleting,
} from "../store/agentsSlice";
import DeleteButton from "./DeleteButton";

export default function DeleteAgentButton({ id }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => selectIsAgentDeleting(state, id));

  return (
    <DeleteButton loading={loading} onClick={() => dispatch(deleteAgent(id))} />
  );
}
