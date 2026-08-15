import React from 'react'
import PropTypes from 'prop-types'
import AboutToolSection from './AboutToolSection.jsx'
import HowToUseSection from './HowToUseSection.jsx'
import ToolFeaturesSection from './ToolFeaturesSection.jsx'
import UseCasesSection from './UseCasesSection.jsx'
import SupportedFormatsSection from './SupportedFormatsSection.jsx'
import PrivacySection from './PrivacySection.jsx'
import { toolContent } from '../../../data/toolContent.js'

/**
 * Looks up this tool's content by slug and renders whichever sections it
 * actually has data for — a tool with no entry in toolContent.js (or an
 * entry missing some fields) renders nothing extra here at all, so
 * ToolLayout stays safe to use for every tool regardless of whether its
 * content has been written yet.
 */
export default function ToolInformation({ toolName, toolSlug }) {
  const content = toolContent[toolSlug]
  if (!content) return null

  return (
    <div className="space-y-16">
      <AboutToolSection toolName={toolName} about={content.about} />
      <ToolFeaturesSection features={content.features} />
      <HowToUseSection toolName={toolName} steps={content.howToUse} />
      <UseCasesSection useCases={content.useCases} />
      <SupportedFormatsSection formats={content.supportedFormats} />
      <PrivacySection privacy={content.privacy} />
    </div>
  )
}

ToolInformation.propTypes = {
  toolName: PropTypes.string.isRequired,
  toolSlug: PropTypes.string.isRequired,
}
