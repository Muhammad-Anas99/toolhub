import React from 'react'
import ToolLayout from '../../components/tools/ToolLayout.jsx'
import TriviaFlashcardsTool from '../../components/tools/fun/TriviaFlashcardsTool.jsx'
import { getToolBySlug } from '../../data/tools.js'
import { toolFaqs } from '../../data/toolFaq.js'
const tool = getToolBySlug('trivia-flashcards')
export default function TriviaFlashcards() {
  return <ToolLayout tool={tool} faqItems={toolFaqs[tool.slug]}><TriviaFlashcardsTool toolSlug={tool.slug} toolName={tool.name} category={tool.category} /></ToolLayout>
}
