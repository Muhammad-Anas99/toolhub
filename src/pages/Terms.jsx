import React from 'react'
import { Link } from 'react-router-dom'
import Container from '../components/ui/Container.jsx'
import SEO from '../components/ui/SEO.jsx'

const LAST_UPDATED = 'September 11, 2026'

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
                use the site. These terms apply to every part of ToolHub: the tools themselves,
                the blog, comments, and any account you create, regardless of which specific
                page or feature you are using at the time.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Use of the service
              </h2>
              <p className="mt-2 leading-relaxed">
                ToolHub&apos;s tools are provided free of charge for personal and commercial use.
                You agree not to use the site to process content that is illegal, infringes on
                others&apos; rights, or violates any applicable law. You also agree not to
                attempt to disrupt the service, circumvent rate limits or access controls, or use
                automated means to scrape or bulk-download content from the site in a way that
                places unreasonable load on it.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Accounts
              </h2>
              <p className="mt-2 leading-relaxed">
                Creating an account is optional; the core tools work without one. If you do
                create an account, you are responsible for keeping your login credentials secure
                and for all activity that happens under your account. You agree to provide
                accurate information when registering and to keep it reasonably up to date. We
                reserve the right to suspend or remove an account that violates these terms,
                including accounts used to post spam, abusive comments, or content that violates
                the rules described below.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Comments and other content you post
              </h2>
              <p className="mt-2 leading-relaxed">
                Comments and any other content you submit publicly on ToolHub remain yours; you
                are not signing away ownership by posting them. By submitting a comment, you
                grant ToolHub a license to display it on the site for as long as it remains
                posted. You agree not to post content that is illegal, harassing, defamatory,
                spam, or infringes on someone else&apos;s intellectual property. We may remove
                comments that violate these rules, and repeated violations may result in your
                account being suspended.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                No warranty
              </h2>
              <p className="mt-2 leading-relaxed">
                ToolHub is provided &quot;as is&quot; without warranties of any kind. While we aim
                for accuracy and reliability, we do not guarantee that any tool will be
                error-free, uninterrupted, or fit for a particular purpose. Tools that are still
                under active development are marked as such on the site, and their results
                should be treated with correspondingly more caution.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Limitation of liability
              </h2>
              <p className="mt-2 leading-relaxed">
                To the fullest extent permitted by law, ToolHub and its operators are not liable
                for any indirect, incidental, or consequential damages arising from your use of
                the site, its tools, or content posted by other users.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Your files and how they are actually handled
              </h2>
              <p className="mt-2 leading-relaxed">
                You retain all rights to files you process using ToolHub&apos;s tools. This is
                worth stating precisely rather than in a blanket way: every conversion,
                compression, resizing, or similar tool processes your file directly in your
                browser, and that specific file is never sent to our servers or stored by us.
                Separately from tool processing, a small number of account-related features do
                involve our servers directly, for example, if you choose to upload a profile
                picture, that image is stored on our servers, unlike the files you run through
                the tools themselves. Our{' '}
                <Link to="/privacy-policy" className="font-medium text-brand-600 hover:underline dark:text-brand-400">
                  Privacy Policy
                </Link>{' '}
                describes exactly which features work which way.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Intellectual property
              </h2>
              <p className="mt-2 leading-relaxed">
                The ToolHub name, logo, and the site&apos;s own design, code, and written content
                (including blog articles) belong to ToolHub and are not licensed for reuse
                without permission. This does not affect your rights to the files you process
                through the tools, which remain entirely yours.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Termination
              </h2>
              <p className="mt-2 leading-relaxed">
                You may stop using ToolHub at any time. We may suspend or terminate access to an
                account that violates these terms, at our discretion, with or without prior
                notice depending on the severity of the violation.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Third-party links and services
              </h2>
              <p className="mt-2 leading-relaxed">
                ToolHub links to external sites in places, including social profiles and, for
                signing in with Google, Google&apos;s own authentication service. We do not
                control these external sites and are not responsible for their content or their
                own privacy practices. Signing in with Google is also governed by Google&apos;s
                own terms, separately from ToolHub&apos;s.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Feedback and tool suggestions
              </h2>
              <p className="mt-2 leading-relaxed">
                If you suggest a tool or feature through the Contact page or another feedback
                channel, you agree that we may use that suggestion to build or improve ToolHub
                without owing you compensation or attribution for the idea. Most of what exists
                on the site today started as exactly this kind of suggestion from someone using
                it.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Changes to these terms
              </h2>
              <p className="mt-2 leading-relaxed">
                We may update these terms as ToolHub evolves, for instance as new features are
                added that these terms did not originally anticipate. Continued use of the site
                after changes are posted constitutes acceptance of the updated terms, and the
                date at the top of this page will always reflect the most recent revision.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Severability
              </h2>
              <p className="mt-2 leading-relaxed">
                If any part of these terms is found to be unenforceable, that part will be
                limited or removed to the minimum extent necessary, and the remaining terms will
                stay in full effect.
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
