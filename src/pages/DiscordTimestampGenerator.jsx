import React from 'react'
import { Link } from 'react-router-dom'
import SEO, { SITE_URL } from '../components/ui/SEO.jsx'
import Container from '../components/ui/Container.jsx'
import TimestampConverterTool from '../components/tools/dev/TimestampConverterTool.jsx'
import ToolFAQSection from '../components/tools/ToolFAQSection.jsx'

const PAGE_PATH = '/tools/discord-timestamp-generator'
const PAGE_TITLE = 'Discord Timestamp Generator — Free <t:> Tag Creator'
const PAGE_DESCRIPTION =
  'Turn any date or time into a Discord timestamp tag that shows correctly in every reader\u2019s own timezone. All 7 Discord styles, including live relative time. Free, no sign-up.'

const DISCORD_FAQ_ITEMS = [
  {
    id: 'how-to-insert-in-discord',
    question: 'How do I actually put this in a Discord message?',
    answer:
      'Copy the generated tag (it looks like <t:1700000000:R>) and paste it directly into your message text, then send as normal. Discord recognizes the syntax automatically and renders it as a formatted, live timestamp \u2014 no special mode or slash command needed to display it.',
  },
  {
    id: 'does-it-update-live',
    question: 'Does the timestamp keep updating, or is it a fixed snapshot?',
    answer:
      'It depends on the style. Relative timestamps (the R style, "in 2 hours") genuinely keep updating live as time passes \u2014 someone reading the message a day later sees "yesterday" instead of a stale "in 2 hours." The other six styles show a fixed date or time that doesn\u2019t change, since they\u2019re meant to display one specific moment rather than a moving countdown.',
  },
  {
    id: 'works-mobile-and-desktop',
    question: 'Does this work in the Discord mobile app too?',
    answer:
      'Yes \u2014 the timestamp tag is part of Discord\u2019s own message formatting, so it renders identically whether the message is read on desktop, mobile, or the web app.',
  },
  {
    id: 'timezone-shown-is-readers',
    question: 'What timezone does the timestamp show in?',
    answer:
      'Always the reader\u2019s own local timezone, automatically \u2014 not the timezone of whoever wrote the message. This is the entire point of the feature: a message written at 9pm in one timezone shows correctly converted for someone reading it at 6am in another, with no manual timezone math from either person.',
  },
  {
    id: 'bots-vs-manual',
    question: 'Do Discord bots generate these the same way I would by hand?',
    answer:
      'Yes, structurally \u2014 a bot just constructs the identical <t:unixTime:style> string programmatically (commonly from a language\u2019s current-time function) instead of a person typing it manually. This tool is useful for exactly that kind of testing too: generate a specific tag here to confirm what a bot-generated timestamp will actually look like before shipping it.',
  },
  {
    id: 'discord-timestamp-generator-privacy',
    question: 'Is anything I enter here sent anywhere?',
    answer:
      'No \u2014 the timestamp tag is generated entirely in your browser. Nothing you enter is ever sent to a server.',
  },
]

export default function DiscordTimestampGenerator() {
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Discord Timestamp Generator',
      description: PAGE_DESCRIPTION,
      url: `${SITE_URL}${PAGE_PATH}`,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Any (runs in any modern browser)',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Tools', item: `${SITE_URL}/tools` },
        { '@type': 'ListItem', position: 3, name: 'Discord Timestamp Generator', item: `${SITE_URL}${PAGE_PATH}` },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: DISCORD_FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ]

  return (
    <>
      <SEO title={PAGE_TITLE} description={PAGE_DESCRIPTION} canonicalPath={PAGE_PATH} structuredData={structuredData} />

      <Container className="py-12">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Discord Timestamp Generator
          </h1>
          <p className="mt-3 text-lg text-slate-600 dark:text-slate-300">
            Generate a Discord timestamp tag that automatically displays in every reader&apos;s own local
            timezone. Pick a style, copy the tag, paste it into your message. Free, no sign-up, and nothing
            you enter ever leaves your browser.
          </p>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-7">
            <TimestampConverterTool
              toolSlug="timestamp-converter"
              toolName="Discord Timestamp Generator"
              category="developer-tools"
            />
          </div>

          <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
            Need to convert a plain Unix timestamp or an ISO 8601 date instead? The full{' '}
            <Link to="/tools/timestamp-converter" className="text-brand-600 underline hover:text-brand-700 dark:text-brand-400">
              Timestamp Converter
            </Link>{' '}
            covers that too.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl space-y-10">
          <section>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              What a Discord Timestamp Actually Does
            </h2>
            <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
              A Discord timestamp is a small piece of message formatting, written as{' '}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm dark:bg-slate-800">
                &lt;t:UNIXTIME:STYLE&gt;
              </code>
              , that Discord automatically converts into a properly formatted date or time when the message
              renders, adjusted to each individual reader&apos;s own device timezone. The number inside is an
              ordinary Unix timestamp, no Discord-specific encoding involved, and the letter at the end picks
              one of seven display styles. The practical effect solves a genuinely common coordination problem:
              a server with members spread across many timezones can announce an event once, and everyone
              reading it sees the correct time for where they actually are, with zero manual timezone
              conversion from anyone involved.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              All 7 Styles, and When to Actually Use Each One
            </h2>
            <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
              Each style suits a genuinely different kind of message, not just a different visual format:
            </p>
            <ul className="mt-4 space-y-3 text-slate-600 dark:text-slate-300">
              <li>
                <strong className="text-slate-900 dark:text-white">Relative (R)</strong> &mdash; &ldquo;in 2
                hours,&rdquo; &ldquo;3 days ago.&rdquo; The right choice for announcing something upcoming,
                since it keeps updating on its own; a message that said &ldquo;in 2 hours&rdquo; when posted
                correctly shows &ldquo;yesterday&rdquo; if someone reads it a day later, without anyone editing
                the message.
              </li>
              <li>
                <strong className="text-slate-900 dark:text-white">Long Date/Time (F)</strong> and{' '}
                <strong className="text-slate-900 dark:text-white">Short Date/Time (f)</strong> &mdash; a
                complete, fixed record of exactly when something happened or will happen, useful for event
                confirmations and logs where the specific moment matters more than how soon it is.
              </li>
              <li>
                <strong className="text-slate-900 dark:text-white">Long Date (D)</strong> and{' '}
                <strong className="text-slate-900 dark:text-white">Short Date (d)</strong> &mdash; just the date,
                no time, for things scheduled to a day rather than a specific hour.
              </li>
              <li>
                <strong className="text-slate-900 dark:text-white">Long Time (T)</strong> and{' '}
                <strong className="text-slate-900 dark:text-white">Short Time (t)</strong> &mdash; just the
                clock time, useful when the date is already obvious from context and repeating it would be
                redundant.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Typing It by Hand vs. a Bot Generating It
            </h2>
            <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
              Someone announcing a one-off event usually generates the tag once here, copies it, and pastes it
              into a message manually. A Discord bot handling recurring events (a scheduled reminder, a
              countdown that reposts automatically) instead constructs the identical{' '}
              <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-sm dark:bg-slate-800">
                &lt;t:...:...&gt;
              </code>{' '}
              string in code, typically from whatever the bot&apos;s programming language returns for the
              current Unix time. Both paths produce the exact same tag structure, and this tool is genuinely
              useful for the bot case too: build the tag manually here first to confirm exactly what a given
              timestamp and style will render as, before wiring the equivalent logic into a bot.
            </p>
          </section>

          <ToolFAQSection items={DISCORD_FAQ_ITEMS} />
        </div>
      </Container>
    </>
  )
}
