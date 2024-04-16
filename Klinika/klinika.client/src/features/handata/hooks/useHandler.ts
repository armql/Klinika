import { useState } from "react";

export default function useHandler() {
  const [handler, setHandler] = useState({
    create_modal: false,
    edit_modal: false,
    refetch_data: false,
  });
  const openCreate = () => {
    setHandler((prev) => ({
      ...prev,
      create_modal: true,
    }));
  };

  const closeCreate = () => {
    setHandler((prev) => ({
      ...prev,
      create_modal: false,
      refetch_data: !prev.refetch_data,
    }));
  };

  const openEdit = () => {
    setHandler((prev) => ({
      ...prev,
      edit_modal: true,
    }));
  };

  const closeEdit = () => {
    setHandler((prev) => ({
      ...prev,
      edit_modal: false,
      refetch_data: !prev.refetch_data,
    }));
  };

  return {
    openEdit,
    closeEdit,
    openCreate,
    closeCreate,
    handler,
  };
}
