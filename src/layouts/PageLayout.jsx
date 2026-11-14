import { cn } from "../utils/cn";

export function PageLayout({ title, description, children, className }) {
  return (
    <section
      className={cn(
        "w-full rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-sm backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/70",
        className,
      )}
    >
      <div className="mb-8 space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100">
          {title}
        </h1>
        {description ? (
          <p className="max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}

export default PageLayout;
