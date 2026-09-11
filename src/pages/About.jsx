import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { HiOutlineBolt, HiOutlineShieldCheck, HiOutlineHeart } from 'react-icons/hi2'
import Container from '../components/ui/Container.jsx'
import SEO from '../components/ui/SEO.jsx'
import { tools } from '../data/tools.js'
import { categories } from '../data/categories.js'

const VALUES = [
  {
    title: 'Speed first',
    description:
      'Every tool is built to feel instant. Most processing happens directly in your browser, so there is no upload, no queue, and no waiting on a server you have never seen.',
    icon: HiOutlineBolt,
  },
  {
    title: 'Privacy by default',
    description:
      'We design tools to keep your files on your device wherever the technology allows it, and we are specific and upfront on the rare occasion a tool genuinely needs to send something to a server.',
    icon: HiOutlineShieldCheck,
  },
  {
    title: 'Built for everyone',
    description:
      'No account, no paywall, no watermark for core tools. If a task is common enough that people search for it constantly, it belongs on ToolHub.',
    icon: HiOutlineHeart,
  },
]

export default function About() {
  return (
    <>
      <SEO
        title="About"
        description="Learn about ToolHub's mission to provide free, fast and private online tools for everyday tasks."
        canonicalPath="/about"
      />

      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 -top-32 -z-10 blur-3xl" aria-hidden="true">
          <div className="mx-auto h-64 w-[32rem] rounded-full bg-brand-200/40 dark:bg-brand-900/30" />
        </div>
        <Container className="py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
              Tools that get out of your way
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-500 dark:text-slate-400">
              ToolHub started with a simple observation: everyday tasks like converting an image
              or formatting a block of JSON shouldn&apos;t require an account, a download, a
              subscription, or a five-minute detour through popups before you get to the thing
              you actually came for.
            </p>
          </motion.div>
        </Container>
      </section>

      <section>
        <Container className="pb-16">
          <div className="mx-auto max-w-3xl space-y-6 text-slate-600 dark:text-slate-300">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Why this exists</h2>
            <p>
              Search for almost any simple file task online and the same pattern shows up
              constantly: a site that buries the actual tool under three ads and a countdown
              timer, or one that silently uploads your file to a server you know nothing about
              before you can even see a preview. Neither of those is a real problem to solve,
              they are just friction that got normalized because nobody pushed back on it.
              ToolHub is a straightforward answer to that pattern: the tool is the whole page,
              it works the moment you land on it, and it does not ask you to trust a stranger's
              server with a file you have not even decided to share yet.
            </p>
            <p>
              We&apos;re building ToolHub as a single home for the small utilities people reach
              for constantly, image conversion, compression, resizing, and cropping to start,
              with PDF, developer, text, unit conversion, security, and social media tools
              already live and more added regularly as they get built properly rather than
              rushed out.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">How the tools actually work</h2>
            <p>
              Most of what ToolHub does happens entirely inside your browser, using standard web
              technology like the Canvas API rather than a server round trip. When you compress
              an image or convert a file format, your browser itself does the actual work; the
              file never leaves your device to do it. That is not a marketing claim, it is a
              direct consequence of how the tools are built, and it is also simply faster: there
              is no upload to wait on, no server queue, no download afterward. The result appears
              the moment the processing finishes, because there was never a network round trip
              involved in the first place.
            </p>
            <p>
              A small number of features genuinely do need a server, an account system for
              people who want to save favorites or comment on the blog, for instance, and we are
              specific about exactly which ones those are rather than leaving it vague. Our{' '}
              <Link to="/privacy-policy" className="font-medium text-brand-600 hover:underline dark:text-brand-400">
                privacy policy
              </Link>{' '}
              spells out precisely what happens with any information a feature like that
              actually needs.
            </p>
            <p>
              A concrete example makes this easier to picture than an abstract description does.
              Open the image compressor, drop in a photo, and what actually happens is your
              browser reading the pixel data straight off your own device, running it through a
              compression algorithm using code that already loaded with the page, and handing
              you back the result, all without a single byte of that photo crossing the network.
              Disconnect your internet connection after the page has loaded and the tool still
              works exactly the same, which is a fairly direct way to confirm that no server was
              ever involved in the actual processing.
            </p>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Where things stand today</h2>
            <p>
              Right now, ToolHub offers {tools.length} tools across {categories.length}{' '}
              categories. That number keeps moving, not because we are chasing a big round
              figure, but because a new tool gets added whenever the same small task keeps
              showing up in what people are searching for. We would rather ship fewer tools that
              genuinely work well than a long list of half-finished ones, which is also why a
              handful of tools on this site are still openly marked as under active development
              rather than pretending they are complete.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/50">
        <Container className="py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              What we care about
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {VALUES.map((value) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                  <value.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900 dark:text-white">
                  {value.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-16">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">What&apos;s missing?</h2>
            <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-300">
              If there is a tool you reach for on another site and wish existed here instead,
              tell us. Most of what has been built so far started as exactly that kind of
              suggestion, and the fastest way to see a new tool added is to point out the gap
              directly rather than assume we already know about it.
            </p>
            <Link to="/contact" className="btn-primary mt-6 inline-flex text-sm">
              Get in touch
            </Link>
          </div>
        </Container>
      </section>
    </>
  )
}
