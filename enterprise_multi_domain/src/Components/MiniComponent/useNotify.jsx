import { useMemo } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "../../Features/NotificationSlice";

export const useNotify = () => {
  const dispatch = useDispatch();

  return useMemo(
    () => ({
      success: (msg) =>
        dispatch(showNotification({ type: "success", message: msg })),
      error: (msg) =>
        dispatch(showNotification({ type: "error", message: msg })),
    }),
    [dispatch],
  );
};

