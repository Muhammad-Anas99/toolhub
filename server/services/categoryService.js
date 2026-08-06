import Category from '../models/Category.js'
import { ApiError } from '../utils/ApiError.js'
import { slugify } from '../utils/slugify.js'

export async function listCategories() {
  return Category.find().sort({ order: 1, name: 1 })
}

export async function getCategoryBySlug(slug) {
  const category = await Category.findOne({ slug: slug.toLowerCase() })
  if (!category) throw ApiError.notFound(`Category "${slug}" was not found`)
  return category
}

export async function createCategory(payload) {
  const slug = payload.slug ? slugify(payload.slug) : slugify(payload.name)

  const existing = await Category.findOne({ slug })
  if (existing) throw ApiError.conflict(`A category with slug "${slug}" already exists`)

  return Category.create({ ...payload, slug })
}

export async function updateCategory(slug, payload) {
  const category = await Category.findOne({ slug: slug.toLowerCase() })
  if (!category) throw ApiError.notFound(`Category "${slug}" was not found`)

  Object.assign(category, payload)
  await category.save()
  return category
}

export async function deleteCategory(slug) {
  const category = await Category.findOneAndDelete({ slug: slug.toLowerCase() })
  if (!category) throw ApiError.notFound(`Category "${slug}" was not found`)
  return category
}
