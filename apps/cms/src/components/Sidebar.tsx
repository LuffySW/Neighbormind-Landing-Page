import { NavLink } from "react-router-dom";

const navItems = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Articles", to: "/articles" },
  { label: "Media", to: "/media" },
  { label: "Brand Settings", to: "/settings/brand" },
  { label: "Homepage Settings", to: "/settings/homepage" }
];

export function Sidebar() {
  return (
    <aside className="hidden w-64 border-r border-neutral-200 bg-white px-5 py-8 md:block">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.4em] text-neutral-400">CMS</p>
        <h1 className="text-lg font-semibold">Neighbormind</h1>
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [
                "block rounded-lg px-3 py-2 text-sm",
                isActive ? "bg-neutral-900 text-white" : "text-neutral-600 hover:bg-neutral-100"
              ].join(" ")
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
