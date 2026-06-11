export function HomepageSettings() {
  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Homepage Settings</h1>
          <p className="text-sm text-neutral-600">
            Configure homepage sections and featured article order.
          </p>
        </div>
        <button className="rounded-lg bg-neutral-900 px-4 py-2 text-sm text-white" type="button">
          Save Changes
        </button>
      </header>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Sections
            </h2>
            <div className="mt-4 space-y-3">
              {["Hero", "Philosophy", "Featured Articles", "Footer"].map((section, index) => (
                <div
                  key={section}
                  className="flex items-center justify-between rounded-lg border border-neutral-200 px-4 py-3 text-sm"
                >
                  <div>
                    <p className="font-semibold text-neutral-900">{section}</p>
                    <p className="text-xs text-neutral-500">Order {index + 1}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="text-xs text-neutral-500 underline" type="button">
                      Move
                    </button>
                    <label className="flex items-center gap-2 text-xs text-neutral-500">
                      <input type="checkbox" defaultChecked />
                      Enabled
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Featured Articles
            </h2>
            <div className="mt-4 space-y-3">
              {["Article 01 - CYRO", "Article 02 - GREED", "Article 03 - NYX"].map(
                (title, index) => (
                  <div
                    key={title}
                    className="flex items-center justify-between rounded-lg border border-neutral-200 px-4 py-3 text-sm"
                  >
                    <div>
                      <p className="font-semibold text-neutral-900">{title}</p>
                      <p className="text-xs text-neutral-500">Order {index + 1}</p>
                    </div>
                    <button className="text-xs text-neutral-500 underline" type="button">
                      Remove
                    </button>
                  </div>
                )
              )}
            </div>
            <button className="mt-4 text-sm text-neutral-900 underline" type="button">
              Add Featured Article
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Section Config
            </h2>
            <div className="mt-4 grid gap-4">
              <label className="text-sm text-neutral-600">
                Hero Title
                <input className="mt-2 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm" />
              </label>
              <label className="text-sm text-neutral-600">
                Hero Subtitle
                <textarea className="mt-2 h-20 w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm" />
              </label>
              <div className="rounded-lg border border-dashed border-neutral-200 p-4 text-xs text-neutral-500">
                Hero background image placeholder.
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-neutral-200 bg-white p-6">
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Footer Preview
            </h2>
            <div className="mt-4 rounded-lg border border-dashed border-neutral-200 p-4 text-xs text-neutral-500">
              Footer layout preview placeholder.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
