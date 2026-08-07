import React from 'react'
import { HiCheck } from 'react-icons/hi2'
import SEO from '../../components/ui/SEO.jsx'
import { useAuth } from '../../context/AuthContext.jsx'

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    description: 'Everything you need for everyday tools.',
    features: ['All core tools', 'Unlimited conversions', 'Conversion history', 'Favorites'],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$—',
    description: 'For frequent use, when it launches.',
    features: ['Everything in Free', 'Priority processing', 'Batch conversions', 'No ads'],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$—',
    description: 'For teams and heavy usage, when it launches.',
    features: ['Everything in Premium', 'API access', 'Team accounts', 'Priority support'],
  },
]

export default function Subscription() {
  const { user } = useAuth()

  return (
    <>
      <SEO title="Subscription" description="Your ToolHub subscription plan." canonicalPath="/dashboard/subscription" />

      <h2 className="text-base font-semibold text-slate-900 dark:text-white">Subscription</h2>
      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
        Premium and Pro plans are in preparation — pricing and payment aren&apos;t live yet. You&apos;re
        on the Free plan, which already includes every tool.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {PLANS.map((plan) => {
          const isCurrent = (user?.plan || 'free') === plan.id
          return (
            <div
              key={plan.id}
              className={`card p-6 ${isCurrent ? 'border-brand-300 ring-1 ring-brand-200 dark:border-brand-800 dark:ring-brand-900' : ''}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">{plan.name}</h3>
                {isCurrent && (
                  <span className="rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700 dark:bg-brand-950 dark:text-brand-400">
                    Current plan
                  </span>
                )}
              </div>
              <p className="mt-2 text-2xl font-bold text-slate-900 dark:text-white">{plan.price}</p>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{plan.description}</p>

              <ul className="mt-5 space-y-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <HiCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                    {feature}
                  </li>
                ))}
              </ul>

              {plan.id !== 'free' && (
                <button type="button" disabled className="btn-secondary mt-6 w-full cursor-not-allowed opacity-60">
                  Coming soon
                </button>
              )}
            </div>
          )
        })}
      </div>
    </>
  )
}
