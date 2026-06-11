export function BrandSettings() {
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Brand Settings</h1>
          <p className="text-sm text-neutral-600">
            Update brand identity, contact info, and SEO defaults.
          </p>
        </div>
        <button className="rounded-lg bg-neutral-900 px-4 py-2 text-sm text-white" type="button">
          Save Changes
        </button>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Brand Identity
            </h2>
            <div className="mt-4 grid gap-4">
              <label className="text-sm text-neutral-600">
                Brand Name
                <input className="mt-2 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm" />
              </label>
              <label className="text-sm text-neutral-600">
                Motto
                <input className="mt-2 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm" />
              </label>
              <label className="text-sm text-neutral-600">
                About Text
                <textarea className="mt-2 h-28 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm" />
              </label>
            </div>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Contact Info
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="text-sm text-neutral-600">
                Email
                <input className="mt-2 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm" />
              </label>
              <label className="text-sm text-neutral-600">
                WhatsApp
                <input className="mt-2 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm" />
              </label>
              <label className="text-sm text-neutral-600">
                Address
                <input className="mt-2 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm" />
              </label>
              <label className="text-sm text-neutral-600">
                City
                <input className="mt-2 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm" />
              </label>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Social Media
            </h2>
            <div className="mt-4 grid gap-4">
              <label className="text-sm text-neutral-600">
                Instagram
                <input className="mt-2 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm" />
              </label>
              <label className="text-sm text-neutral-600">
                TikTok
                <input className="mt-2 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm" />
              </label>
              <label className="text-sm text-neutral-600">
                X / Twitter
                <input className="mt-2 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm" />
              </label>
            </div>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
              SEO Defaults
            </h2>
            <div className="mt-4 grid gap-4">
              <label className="text-sm text-neutral-600">
                Meta Title
                <input className="mt-2 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm" />
              </label>
              <label className="text-sm text-neutral-600">
                Meta Description
                <textarea className="mt-2 h-20 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm" />
              </label>
              <div className="rounded-lg border border-dashed border-neutral-200 p-4 text-xs text-neutral-500">
                Open Graph image selector placeholder.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
