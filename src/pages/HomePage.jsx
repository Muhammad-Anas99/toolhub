import PageLayout from "../layouts/PageLayout";

export function HomePage() {
  return (
    <PageLayout
      title="Home"
      description="A placeholder page ready for future sections and content."
    >
      <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">
        Home page placeholder
      </div>
    </PageLayout>
  );
}

export default HomePage;
