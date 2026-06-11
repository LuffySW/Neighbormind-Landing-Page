import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

type RouteGuardProps = {
  children: ReactNode;
};

export function RouteGuard({ children }: RouteGuardProps) {
  const location = useLocation();
  const { user, loading, adminEmail, isAuthorized, signOut } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-neutral-500">
        Checking session...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (!adminEmail) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 text-sm text-neutral-500">
        <div className="max-w-md rounded-xl border border-neutral-200 bg-white p-6 text-center">
          <p className="text-base font-semibold text-neutral-900">Admin email not configured</p>
          <p className="mt-2 text-sm text-neutral-500">
            Set VITE_ADMIN_EMAIL in apps/cms/.env to allow access.
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6 text-sm text-neutral-500">
        <div className="max-w-md rounded-xl border border-neutral-200 bg-white p-6 text-center">
          <p className="text-base font-semibold text-neutral-900">Access denied</p>
          <p className="mt-2 text-sm text-neutral-500">
            Your account is not the allowed admin. Sign out and use {adminEmail}.
          </p>
          <button
            className="mt-4 rounded-lg border border-neutral-200 px-4 py-2 text-sm text-neutral-600"
            type="button"
            onClick={signOut}
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
