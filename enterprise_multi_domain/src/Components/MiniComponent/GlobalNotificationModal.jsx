import { useDispatch, useSelector } from "react-redux";
import { CheckCircle, XCircle } from "lucide-react";
import { hideNotification } from "../../Features/NotificationSlice";

const GlobalNotificationModal = () => {
  const dispatch = useDispatch();
  const { open, type, message, code } = useSelector(
    (state) => state.notification,
  );

  if (!open) return null;

  const isError = type === "error";

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-999">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-100 shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          {isError ? (
            <XCircle className="text-red-500" />
          ) : (
            <CheckCircle className="text-green-500" />
          )}
          <h2 className="font-bold text-lg">{isError ? "Error" : "Success"}</h2>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-300">{message}</p>

        {code && <p className="text-xs text-gray-400 mt-2">Code: {code}</p>}

        <button
          onClick={() => dispatch(hideNotification())}
          className="mt-5 w-full bg-[#135bec] text-white py-2 rounded-lg"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default GlobalNotificationModal;
