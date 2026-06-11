import { useAuth } from "../context/AuthContext";

export function Topbar() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <header className="flex items-center justify-between border-b border-neutral-200 bg-white px-6 py-4 md:px-10">
      <div>
        <h2 className="text-sm font-semibold text-neutral-900">Admin CMS</h2>
        <p className="text-xs text-neutral-500">Mind Over Stereotypes</p>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xs text-neutral-500">
          {user?.email ? `Signed in as ${user.email}` : "Signed in"}
        </span>
        <button
          className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-600"
          type="button"
          onClick={handleSignOut}
        >
          Log out
        </button>
      </div>
    </header>
  );
}
