import React from 'react'
import Container from '../components/ui/Container.jsx'
import SEO from '../components/ui/SEO.jsx'

const LAST_UPDATED = 'August 4, 2026'

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Read ToolHub's privacy policy to understand how we handle your data."
        canonicalPath="/privacy-policy"
      />

      <Container className="py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
            Last updated: {LAST_UPDATED}
          </p>

          <div className="mt-10 space-y-8 text-slate-600 dark:text-slate-300">
            <section>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Overview</h2>
              <p className="mt-2 leading-relaxed">
                ToolHub provides free online tools for tasks like image conversion, compression
                and resizing. This policy explains what information is involved when you use the
                site and how it is handled.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Browser-based processing
              </h2>
              <p className="mt-2 leading-relaxed">
                Wherever possible, ToolHub tools process your files directly in your browser.
                Files handled this way are never uploaded to our servers and are not stored or
                seen by us. If a tool requires uploading a file to be processed, this will be made
                clear on that tool's page before you use it.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Information we collect
              </h2>
              <p className="mt-2 leading-relaxed">
                ToolHub does not currently require account creation, and we do not collect
                personal information as part of normal tool use. If you contact us through the
                Contact page, we receive the name, email address, and message you choose to
                provide, which we use solely to respond to your inquiry.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Local storage and preferences
              </h2>
              <p className="mt-2 leading-relaxed">
                ToolHub stores your dark/light mode preference in your browser's local storage.
                This information stays on your device and is not sent to us.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Future changes
              </h2>
              <p className="mt-2 leading-relaxed">
                As ToolHub grows, we may introduce features such as user accounts or analytics
                that involve additional data handling. If that happens, this policy will be
                updated in advance to describe those changes clearly.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Contact</h2>
              <p className="mt-2 leading-relaxed">
                Questions about this policy can be sent through the Contact page.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </>
  )
}
