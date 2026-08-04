import React from 'react'
import { Link } from 'react-router-dom'
import { FaGithub, FaTwitter } from 'react-icons/fa6'
import Container from '../ui/Container.jsx'
import { categories, getToolsByCategory } from '../../data/tools.js'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
      <Container className="py-12">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
                T
              </span>
              <span className="text-lg font-bold text-slate-900 dark:text-white">ToolHub</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm text-slate-500 dark:text-slate-400">
              Free online tools that work right in your browser. No installs, no sign-up.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ToolHub on GitHub"
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <FaGithub className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="ToolHub on Twitter"
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <FaTwitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {categories.map((category) => {
            const categoryTools = getToolsByCategory(category.slug)
            return (
              <div key={category.id}>
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
                  {category.name}
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {categoryTools.map((tool) => (
                    <li key={tool.id}>
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {tool.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}

          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Company</h3>
            <ul className="mt-3 space-y-2.5">
              <li>
                <Link
                  to="/tools"
                  className="text-sm text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
                >
                  All Tools
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-200 pt-6 dark:border-slate-800">
          <p className="text-center text-sm text-slate-500 dark:text-slate-400">
            &copy; {year} ToolHub. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
