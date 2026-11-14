import PageLayout from "../layouts/PageLayout";

export function AboutPage() {
  return (
    <PageLayout
      title="About"
      description="A placeholder page ready for future sections and content."
    >
      <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500 dark:border-slate-700 dark:text-slate-400">
        About page placeholder
      </div>
    </PageLayout>
  );
}

export default AboutPage;
