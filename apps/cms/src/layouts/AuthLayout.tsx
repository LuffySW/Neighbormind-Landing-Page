import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <div className="mx-auto flex min-h-screen w-full max-w-md items-center px-6">
        <div className="w-full rounded-2xl border border-neutral-800 bg-neutral-900 p-8 shadow-xl">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
