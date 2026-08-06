import { asyncHandler } from '../utils/asyncHandler.js'
import { sendSuccess } from '../utils/ApiResponse.js'
import * as categoryService from '../services/categoryService.js'

export const getCategories = asyncHandler(async (req, res) => {
  const categories = await categoryService.listCategories()
  sendSuccess(res, { data: categories, meta: { count: categories.length } })
})

export const getCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.getCategoryBySlug(req.params.slug)
  sendSuccess(res, { data: category })
})

export const createCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.createCategory(req.body)
  sendSuccess(res, { statusCode: 201, message: 'Category created', data: category })
})

export const updateCategory = asyncHandler(async (req, res) => {
  const category = await categoryService.updateCategory(req.params.slug, req.body)
  sendSuccess(res, { message: 'Category updated', data: category })
})

export const deleteCategory = asyncHandler(async (req, res) => {
  await categoryService.deleteCategory(req.params.slug)
  sendSuccess(res, { message: 'Category deleted' })
})
