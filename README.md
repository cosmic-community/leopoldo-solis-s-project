# Leopoldo Solís Portfolio

![App Preview](https://imgix.cosmicjs.com/b0318840-5a6c-11f1-93fc-1339ba0f6cad-autopilot-photo-1460925895917-afdab827c52f-1779955828412.jpeg?w=1200&h=630&fit=crop&auto=format,compress)

A modern, responsive portfolio and blog website built with Next.js 16 and [Cosmic](https://www.cosmicjs.com).

## Features

- 🎨 Beautiful project showcase with galleries
- 📝 Blog with category filtering
- 🏷️ Color-coded category system
- ⚡ Server-side rendering with Next.js 16
- 📱 Fully responsive design
- 🚀 Optimized images via imgix

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6a17f816f2c683f5f2b37bdc&clone_repository=6a17f923f2c683f5f2b37c0a)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for: Diseñane lo que vos quieras"

### Code Generation Prompt

> Build a Next.js application for a website called "Leopoldo Solis's Project". The content is managed in Cosmic CMS with the following object types: categorias, posts, proyectos. Create a beautiful, modern, responsive design with a homepage and pages for each content type. User instructions: Diseñane lo que vos quieras

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- Cosmic SDK
- imgix for image optimization

## Getting Started

### Prerequisites
- Bun installed
- A Cosmic account and bucket

### Installation

```bash
bun install
bun run dev
```

## Cosmic SDK Examples

```typescript
// Fetch all projects
const { objects } = await cosmic.objects
  .find({ type: 'proyectos' })
  .depth(1)

// Fetch single post by slug
const { object } = await cosmic.objects
  .findOne({ type: 'posts', slug })
  .depth(1)
```

## Cosmic CMS Integration

This app uses three content types:
- **proyectos** — Portfolio projects
- **posts** — Blog articles
- **categorias** — Categories

## Deployment Options

Deploy to [Vercel](https://vercel.com) or [Netlify](https://netlify.com). Set environment variables:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

<!-- README_END -->