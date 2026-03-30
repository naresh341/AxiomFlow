import { useSelector } from "react-redux";
import {
  selectIsAuthenticated,
  selectUser,
} from "../../RTKThunk/authSelectors";
import toast from "react-hot-toast";

export const ProtectedComponent = ({
  children,
  requiredRole,
  requiredPermission,
}) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  const hasAccess =
    isAuthenticated &&
    (!requiredRole || user?.role === requiredRole) &&
    (!requiredPermission || user?.permissions?.includes(requiredPermission));

  if (!hasAccess) {
    return (
      <div className="relative group cursor-not-allowed">
        {/* 1. The Visual Layer (Looks locked) */}
        <div className="pointer-events-none opacity-50 grayscale transition-all duration-300">
          {children}
        </div>

        {/* 2. The Interaction Shield (Catches everything) */}
        <div
          className="absolute inset-0 z-50 rounded-md"
          onClick={(e) => {
            e.stopPropagation();
            toast.error(
              "🔒 Access Restricted: Please login to unlock filters.",
              {
                id: "protected-toast", // Prevents toast spam if they click fast
                style: {
                  borderRadius: "10px",
                  background: "#333",
                  color: "#fff",
                },
              },
            );
          }}
        />
      </div>
    );
  }

  return children;
};
