import { asyncHandler } from '../utils/asyncHandler.js'
import { sendSuccess } from '../utils/ApiResponse.js'
import * as toolService from '../services/toolService.js'

export const getTools = asyncHandler(async (req, res) => {
  const { category, search, featured } = req.query
  const tools = await toolService.listTools({ category, search, featured })
  sendSuccess(res, { data: tools, meta: { count: tools.length } })
})

export const getTool = asyncHandler(async (req, res) => {
  const tool = await toolService.getToolBySlug(req.params.slug)
  sendSuccess(res, { data: tool })
})

export const createTool = asyncHandler(async (req, res) => {
  const tool = await toolService.createTool(req.body)
  sendSuccess(res, { statusCode: 201, message: 'Tool created', data: tool })
})

export const updateTool = asyncHandler(async (req, res) => {
  const tool = await toolService.updateTool(req.params.slug, req.body)
  sendSuccess(res, { message: 'Tool updated', data: tool })
})

export const deleteTool = asyncHandler(async (req, res) => {
  await toolService.deleteTool(req.params.slug)
  sendSuccess(res, { message: 'Tool deleted' })
})
