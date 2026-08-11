import React from 'react'
import { Link } from 'react-router-dom'
import Container from '../components/ui/Container.jsx'
import SEO from '../components/ui/SEO.jsx'

const LAST_UPDATED = 'August 4, 2026'

export default function Terms() {
  return (
    <>
      <SEO
        title="Terms & Conditions"
        description="Read the terms and conditions for using ToolHub's free online tools."
        canonicalPath="/terms"
      />

      <Container className="py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Terms &amp; Conditions
          </h1>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Last updated: {LAST_UPDATED}
          </p>

          <div className="mt-10 space-y-8 text-slate-600 dark:text-slate-300">
            <section>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Acceptance of terms
              </h2>
              <p className="mt-2 leading-relaxed">
                By using ToolHub, you agree to these terms. If you do not agree, please do not
                use the site.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Use of the service
              </h2>
              <p className="mt-2 leading-relaxed">
                ToolHub's tools are provided free of charge for personal and commercial use. You
                agree not to use the site to process content that is illegal, infringes on
                others' rights, or violates any applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                No warranty
              </h2>
              <p className="mt-2 leading-relaxed">
                ToolHub is provided "as is" without warranties of any kind. While we aim for
                accuracy and reliability, we do not guarantee that any tool will be error-free,
                uninterrupted, or fit for a particular purpose.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Limitation of liability
              </h2>
              <p className="mt-2 leading-relaxed">
                To the fullest extent permitted by law, ToolHub and its operators are not liable
                for any indirect, incidental, or consequential damages arising from your use of
                the site or its tools.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Your content
              </h2>
              <p className="mt-2 leading-relaxed">
                You retain all rights to files you process using ToolHub. Every tool processes
                your file directly in your browser — the original file you upload is never sent
                to us. If you create an account and click Download on a result, we retain a copy
                of that specific output file so it can appear in your Downloads library; see our{' '}
                <Link to="/privacy-policy" className="text-brand-600 dark:text-brand-400">
                  Privacy Policy
                </Link>{' '}
                for details. You can remove any item from your Downloads library at any time.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Changes to these terms
              </h2>
              <p className="mt-2 leading-relaxed">
                We may update these terms as ToolHub evolves. Continued use of the site after
                changes are posted constitutes acceptance of the updated terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Contact</h2>
              <p className="mt-2 leading-relaxed">
                Questions about these terms can be sent through the Contact page.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </>
  )
}
