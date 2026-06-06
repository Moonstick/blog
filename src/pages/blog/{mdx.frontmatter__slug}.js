import * as React from 'react'
import { Link, graphql } from 'gatsby'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../../components/layout'
import Seo from '../../components/seo'

function formatDate(dateStr) {
  if (!dateStr) return ''
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(year, month - 1, day)
  )
}

function getCategoryStyle(category) {
  const styles = {
    'Software Design': 'bg-purple-100 text-purple-700',
    'Systems Design': 'bg-blue-100 text-blue-700',
    'AI': 'bg-green-100 text-green-700',
    'Personal Projects': 'bg-orange-100 text-orange-700',
  }
  return styles[category] || 'bg-slate-100 text-slate-600'
}

const BlogPost = ({ data, children }) => {
  const { frontmatter } = data.mdx
  const image = getImage(frontmatter.hero_image)
  const postUrl = `https://davidobrien.uk/blog/${frontmatter.slug}`
  const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-6 py-12">
        {/* Post header */}
        <header className="mb-8">
          {frontmatter.category && (
            <span
              className={`inline-block text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full mb-4 ${getCategoryStyle(frontmatter.category)}`}
            >
              {frontmatter.category}
            </span>
          )}
          <h1 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">
            {frontmatter.title}
          </h1>
          <p className="text-slate-500 text-sm">
            Published{' '}
            <time dateTime={frontmatter.date}>{formatDate(frontmatter.date)}</time>
          </p>
        </header>

        {/* Hero image */}
        {image && (
          <div className="mb-10 rounded-xl overflow-hidden">
            <GatsbyImage image={image} alt={frontmatter.hero_image_alt || ''} className="w-full" />
            {frontmatter.hero_image_credit_text && (
              <p className="text-xs text-slate-400 mt-2 text-right">
                Photo:{' '}
                <a
                  href={frontmatter.hero_image_credit_link}
                  className="underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  {frontmatter.hero_image_credit_text}
                </a>
              </p>
            )}
          </div>
        )}

        {/* Post content */}
        <div className="prose prose-slate prose-lg max-w-none mb-12">
          {children}
        </div>

        {/* Share & navigation */}
        <div className="border-t border-slate-200 pt-8">
          <p className="text-slate-600 text-sm mb-4 font-medium">Enjoyed this post? Share it:</p>
          <a
            href={linkedInShareUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Share on LinkedIn
          </a>
          <div className="mt-8">
            <Link
              to="/blog"
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors"
            >
              &larr; Back to all posts
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const Head = ({ data }) => {
  const { frontmatter } = data.mdx
  return (
    <Seo
      title={frontmatter.title}
      description={frontmatter.description}
      pathname={`/blog/${frontmatter.slug}`}
      article={true}
      publishedTime={frontmatter.rawDate}
    />
  )
}

export const query = graphql`
  query($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        date
        slug
        category
        description
        hero_image_alt
        hero_image_credit_text
        hero_image_credit_link
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
        }
      }
    }
  }
`

export default BlogPost
