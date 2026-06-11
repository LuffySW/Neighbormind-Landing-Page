import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const { user, signIn, adminEmail } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const message = await signIn(email, password);
    if (message) {
      setError(message);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-[0.4em] text-neutral-500">Admin</p>
        <h1 className="text-2xl font-semibold">Masuk ke CMS</h1>
        <p className="text-sm text-neutral-400">Gunakan akun admin Supabase.</p>
      </header>
      {!adminEmail ? (
        <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs text-amber-200">
          VITE_ADMIN_EMAIL belum diatur. CMS akan menolak akses sampai env terisi.
        </p>
      ) : (
        <p className="text-xs text-neutral-500">Allowed admin: {adminEmail}</p>
      )}
      <form className="space-y-4" onSubmit={handleSubmit}>
        <label className="block text-sm text-neutral-300">
          Email
          <input
            className="mt-2 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-neutral-100"
            placeholder="admin@neighbormind.id"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />
        </label>
        <label className="block text-sm text-neutral-300">
          Password
          <input
            className="mt-2 w-full rounded-lg border border-neutral-700 bg-neutral-950 px-3 py-2 text-sm text-neutral-100"
            placeholder="********"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
        </label>
        {error ? <p className="text-xs text-rose-400">{error}</p> : null}
        <button
          className="w-full rounded-lg bg-white px-4 py-2 text-sm font-semibold text-neutral-900"
          type="submit"
          disabled={loading}
        >
          {loading ? "Memproses..." : "Masuk"}
        </button>
      </form>
    </div>
  );
}
