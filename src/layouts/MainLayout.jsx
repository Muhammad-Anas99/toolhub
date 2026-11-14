import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FiArrowRight, FiMenu, FiSearch, FiX } from "react-icons/fi";
import { LuSparkles } from "react-icons/lu";
import ThemeToggle from "../components/ThemeToggle";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
];

export function MainLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(129,140,248,0.16),_transparent_34%),linear-gradient(135deg,_#f8fafc_0%,_#f1f5f9_100%)] text-slate-900 transition-colors duration-300 dark:bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.28),_transparent_34%),linear-gradient(135deg,_#020617_0%,_#0f172a_100%)] dark:text-slate-100">
      <header className="sticky top-0 z-50 border-b border-white/60 bg-white/70 backdrop-blur-xl dark:border-slate-800/70 dark:bg-slate-950/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-lg shadow-slate-900/10 dark:bg-white dark:text-slate-900">
              <LuSparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="text-base font-semibold tracking-tight">ToolHub</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Premium product workspace
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-3 lg:flex lg:flex-1 lg:justify-end">
            <label className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-sm text-slate-500 shadow-sm transition focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-200 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-400 dark:focus-within:ring-indigo-500/20">
              <FiSearch className="h-4 w-4" />
              <input
                type="text"
                placeholder="Search"
                className="w-36 border-none bg-transparent outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
              />
            </label>

            <nav className="flex items-center gap-1 rounded-full border border-slate-200 bg-white/70 p-1 shadow-sm dark:border-slate-700 dark:bg-slate-900/70">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-slate-900 text-white shadow-sm dark:bg-white dark:text-slate-900"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <ThemeToggle />

            <button className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-500">
              Get Started
              <FiArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-700 shadow-sm transition hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-200"
              aria-label="Toggle navigation"
            >
              {isMenuOpen ? (
                <FiX className="h-5 w-5" />
              ) : (
                <FiMenu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {isMenuOpen ? (
          <div className="border-t border-slate-200 bg-white/90 px-4 py-4 shadow-lg backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90 lg:hidden">
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
                <FiSearch className="h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full border-none bg-transparent outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
                />
              </label>

              <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `rounded-2xl px-3 py-2 text-sm font-medium transition ${
                        isActive
                          ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                ))}
              </nav>

              <button className="inline-flex items-center justify-center gap-2 rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500">
                Get Started
                <FiArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : null}
      </header>

      <main className="mx-auto flex w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
