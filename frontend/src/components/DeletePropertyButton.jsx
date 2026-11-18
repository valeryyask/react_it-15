// src/components/DeletePropertyButton.jsx — ОПЕРАЦИЯ УДАЛЕНИЯ объекта недвижимости.
// Сам диспатчит deleteProperty и сам следит за своим спиннером по id строки.

import { useDispatch, useSelector } from "react-redux";
import {
  deleteProperty,
  selectIsPropertyDeleting,
} from "../store/propertiesSlice";
import DeleteButton from "./DeleteButton";

export default function DeletePropertyButton({ id }) {
  const dispatch = useDispatch();
  const loading = useSelector((state) => selectIsPropertyDeleting(state, id));

  return (
    <DeleteButton loading={loading} onClick={() => dispatch(deleteProperty(id))} />
  );
}
