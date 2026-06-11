import { NavLink } from "react-router-dom";

export function NotFound() {
  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-semibold">Page not found</h1>
      <p className="text-sm text-neutral-600">The CMS route does not exist yet.</p>
      <NavLink className="text-sm text-neutral-900 underline" to="/dashboard">
        Back to dashboard
      </NavLink>
    </div>
  );
}
