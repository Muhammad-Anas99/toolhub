import { FiMoon, FiSun } from "react-icons/fi";
import useTheme from "../hooks/useTheme";
import { cn } from "../utils/cn";

export function ThemeToggle({ className }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:text-white",
        className,
      )}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <span
        className={cn(
          "transition-transform duration-300",
          isDark && "rotate-180",
        )}
      >
        {isDark ? (
          <FiSun className="h-5 w-5" />
        ) : (
          <FiMoon className="h-5 w-5" />
        )}
      </span>
    </button>
  );
}

export default ThemeToggle;
