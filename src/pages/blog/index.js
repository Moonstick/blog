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

const BlogPage = ({ data }) => {
  const [activeCategory, setActiveCategory] = React.useState('All')

  const allPosts = data.allMdx.nodes
  const categories = ['All', ...new Set(allPosts.map(n => n.frontmatter.category).filter(Boolean))]
  const posts = activeCategory === 'All'
    ? allPosts
    : allPosts.filter(n => n.frontmatter.category === activeCategory)

  return (
    <Layout pageTitle="Blog">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map(post => {
            const heroImage = getImage(post.frontmatter.hero_image)
            return (
              <article
                key={post.id}
                className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
              >
                {heroImage ? (
                  <GatsbyImage
                    image={heroImage}
                    alt={post.frontmatter.hero_image_alt || ''}
                    className="w-full h-44"
                  />
                ) : (
                  <div className="w-full h-44 bg-gradient-to-br from-slate-100 to-slate-200" />
                )}
                <div className="p-5 flex flex-col flex-1">
                  {post.frontmatter.category && (
                    <span
                      className={`inline-block text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full mb-2 self-start ${getCategoryStyle(post.frontmatter.category)}`}
                    >
                      {post.frontmatter.category}
                    </span>
                  )}
                  <h2 className="text-base font-semibold text-slate-900 mb-2 leading-snug flex-1">
                    <Link
                      to={`/blog/${post.frontmatter.slug}`}
                      className="hover:text-indigo-600 transition-colors"
                    >
                      {post.frontmatter.title}
                    </Link>
                  </h2>
                  <p className="text-slate-500 text-xs mb-3">{formatDate(post.frontmatter.date)}</p>
                  <p
                    className="text-slate-600 text-sm leading-relaxed"
                    style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {post.frontmatter.description || post.excerpt}
                  </p>
                </div>
              </article>
            )
          })}
        </div>

        {posts.length === 0 && (
          <p className="text-slate-500 text-center py-16">No posts in this category yet.</p>
        )}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query BlogListingQuery {
    allMdx(
      filter: { frontmatter: { date: { ne: null } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        frontmatter {
          date
          slug
          title
          category
          description
          hero_image_alt
          hero_image {
            childImageSharp {
              gatsbyImageData(width: 400, height: 176, transformOptions: { cropFocus: CENTER })
            }
          }
        }
        id
        excerpt
      }
    }
  }
`

export const Head = () => (
  <Seo
    title="Blog"
    pathname="/blog"
    description="Articles on systems design, software engineering, AI, and more by David O'Brien."
  />
)

export default BlogPage
