import { createBucketClient } from '@cosmicjs/sdk'
import type { Post, Proyecto, Categoria } from '@/types'

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return ''
  if (typeof field === 'string') return field
  if (typeof field === 'number' || typeof field === 'boolean') return String(field)
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value)
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key)
  }
  return ''
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'posts' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    const posts = response.objects as Post[]
    return posts.sort((a, b) => {
      const dateA = new Date(a.metadata?.fecha_publicacion || a.created_at).getTime()
      const dateB = new Date(b.metadata?.fecha_publicacion || b.created_at).getTime()
      return dateB - dateA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch posts')
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'posts', slug })
      .depth(1)
    return response.object as Post
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch post')
  }
}

export async function getAllProyectos(): Promise<Proyecto[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'proyectos' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at'])
      .depth(1)

    const proyectos = response.objects as Proyecto[]
    return proyectos.sort((a, b) => {
      const yearA = Number(a.metadata?.ano || 0)
      const yearB = Number(b.metadata?.ano || 0)
      return yearB - yearA
    })
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch projects')
  }
}

export async function getProyectoBySlug(slug: string): Promise<Proyecto | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'proyectos', slug })
      .depth(1)
    return response.object as Proyecto
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch project')
  }
}

export async function getAllCategorias(): Promise<Categoria[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'categorias' })
      .props(['id', 'title', 'slug', 'metadata'])
      .depth(1)
    return response.objects as Categoria[]
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return []
    throw new Error('Failed to fetch categories')
  }
}

export async function getCategoriaBySlug(slug: string): Promise<Categoria | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'categorias', slug })
      .depth(1)
    return response.object as Categoria
  } catch (error) {
    if (hasStatus(error) && error.status === 404) return null
    throw new Error('Failed to fetch category')
  }
}