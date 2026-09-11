import React from 'react'
import Container from '../components/ui/Container.jsx'
import SEO from '../components/ui/SEO.jsx'

const LAST_UPDATED = 'September 11, 2026'

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
                ToolHub provides free online tools for tasks like image conversion, compression,
                and resizing, along with an optional account system, a blog, and community
                features like comments. This policy explains what information is involved at
                each part of the site and how it is handled. We have tried to write it in plain
                language rather than dense legal boilerplate, and to keep it accurate to what the
                site actually does rather than a generic template.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Browser-based tool processing
              </h2>
              <p className="mt-2 leading-relaxed">
                This is the core of the site, so it is worth stating plainly: every conversion,
                compression, resize, crop, or rotation tool processes your file directly in your
                browser using standard web technology (the Canvas API). The file you upload to
                one of these tools is never sent to our servers, and we never see or store it.
                This applies every time you use a tool, whether or not you are signed in, and it
                is true regardless of what kind of file it is or how sensitive its contents are.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Accounts
              </h2>
              <p className="mt-2 leading-relaxed">
                Creating an account is optional. Every tool works without one; an account exists
                for people who want to save favorite tools, comment on blog posts, or manage a
                profile. If you register with email and password, we collect your name, email
                address, and password, stored as a secure one-way hash, never in plain text and
                never in a form we could read back even if we wanted to. If you sign in with
                Google instead, Google provides us your name, email address, and profile
                picture; we never see or store your Google password. You can also upload your
                own profile picture directly, which is stored on our servers, unlike the files
                you process through the tools themselves.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                How we keep your session secure
              </h2>
              <p className="mt-2 leading-relaxed">
                Staying signed in relies on two different mechanisms working together. A
                short-lived access token is kept only in your browser&apos;s memory for the
                current tab, never written to disk, so it disappears the moment you close the
                tab. A longer-lived refresh token is stored in an httpOnly cookie, meaning it is
                sent automatically with requests to our server but cannot be read by JavaScript
                running on the page, including a malicious script if one were ever injected into
                the site. We chose this approach specifically because it is more resistant to
                theft than storing a token in a place ordinary page scripts can access.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Comments and likes
              </h2>
              <p className="mt-2 leading-relaxed">
                Commenting on a blog post requires an account, and the comment text you submit is
                stored on our servers, linked to your account, and shown publicly beneath that
                post along with your display name. You can edit or delete your own comment at
                any time. Liking or disliking a post does not require an account; we store only
                the total count of likes and dislikes on each post, and your browser remembers
                which reaction you gave (if any) using local storage on your own device, so we
                have no server-side record tying a specific like to a specific person.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Local storage and preferences
              </h2>
              <p className="mt-2 leading-relaxed">
                Beyond the reaction tracking described above, ToolHub stores your dark or light
                mode preference in your browser&apos;s local storage. Information stored this way
                stays on your device and is never transmitted to us; it simply lets the site
                remember your preference the next time you visit.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Usage analytics
              </h2>
              <p className="mt-2 leading-relaxed">
                We keep basic, aggregate statistics about how the site is used: which tools get
                used and how often, a general country-level location derived from your network
                connection (not your precise location, and not stored as a raw IP address), and
                a general device category such as desktop or mobile. This data is used to
                understand which tools are useful and where to focus development, not to build a
                profile of any individual visitor.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Contact form
              </h2>
              <p className="mt-2 leading-relaxed">
                If you contact us through the Contact page, we receive the name, email address,
                and message you choose to provide, which we use solely to respond to your
                inquiry. We do not add your email to a mailing list or share it with anyone else
                as a result of contacting us.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Your data, and deleting it
              </h2>
              <p className="mt-2 leading-relaxed">
                Self-service account deletion is not currently built into the site. If you would
                like your account and the personal information tied to it removed, contact us
                through the Contact page and we will handle the request directly. Deleting your
                account removes your profile information and disassociates your comments from
                your identity; it does not retroactively "un-send" a comment that other visitors
                may already have read or quoted elsewhere.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Children&apos;s privacy
              </h2>
              <p className="mt-2 leading-relaxed">
                ToolHub is not directed at children under 13, and we do not knowingly collect
                personal information from anyone in that age group. If you believe a child has
                provided us with personal information, contact us and we will remove it.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                Future changes
              </h2>
              <p className="mt-2 leading-relaxed">
                As ToolHub grows, we may introduce additional features that involve further data
                handling, such as advertising. If that happens, this policy will be updated in
                advance to describe those changes clearly, and the date at the top of this page
                will reflect when it was last revised.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Contact</h2>
              <p className="mt-2 leading-relaxed">
                Questions about this policy, or requests related to your personal data, can be
                sent through the Contact page.
              </p>
            </section>
          </div>
        </div>
      </Container>
    </>
  )
}
