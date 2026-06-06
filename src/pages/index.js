import * as React from 'react'
import { Link, graphql } from 'gatsby'
import { StaticImage, GatsbyImage, getImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'
import Seo from '../components/seo'

function formatDate(dateStr) {
  if (!dateStr) return ''
  const [year, month, day] = dateStr.split('-').map(Number)
  return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(
    new Date(year, month - 1, day)
  )
}

const IndexPage = ({ data }) => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-slate-50 border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-16 flex flex-col sm:flex-row items-center gap-10">
          <div className="flex-shrink-0">
            <StaticImage
              src="../images/photo.jpg"
              alt="David O'Brien"
              width={160}
              height={160}
              imgStyle={{ borderRadius: '50%', objectFit: 'cover' }}
              className="rounded-full ring-4 ring-indigo-100"
            />
          </div>
          <div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">David O&apos;Brien</h1>
            <p className="text-lg text-indigo-600 font-medium mb-4">
              Principal Craftsman &middot; Software Consultant
            </p>
            <p className="text-slate-600 leading-relaxed mb-6 max-w-xl">
              I write about systems design, software engineering practices, AI, and the occasional
              personal project. This is where I document what I learn and explore ideas I&apos;ve
              been thinking about for a while.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link
                to="/blog"
                className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
              >
                Read the Blog
              </Link>
              <Link
                to="/about"
                className="border border-slate-300 text-slate-700 px-5 py-2.5 rounded-lg font-medium hover:bg-slate-100 transition-colors"
              >
                About Me
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Posts */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Recent Posts</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data.allMdx.nodes.map(post => {
            const heroImage = getImage(post.frontmatter.hero_image)
            return (
              <article
                key={post.id}
                className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                {heroImage ? (
                  <GatsbyImage
                    image={heroImage}
                    alt={post.frontmatter.hero_image_alt || ''}
                    className="w-full h-40"
                  />
                ) : (
                  <div className="w-full h-40 bg-slate-100" />
                )}
                <div className="p-5">
                  {post.frontmatter.category && (
                    <span className="text-xs font-semibold uppercase tracking-wide text-indigo-600 mb-1 block">
                      {post.frontmatter.category}
                    </span>
                  )}
                  <h3 className="text-base font-semibold text-slate-900 mb-1 leading-snug">
                    <Link
                      to={`/blog/${post.frontmatter.slug}`}
                      className="hover:text-indigo-600 transition-colors"
                    >
                      {post.frontmatter.title}
                    </Link>
                  </h3>
                  <p className="text-slate-500 text-xs">{formatDate(post.frontmatter.date)}</p>
                </div>
              </article>
            )
          })}
        </div>
        <div className="mt-10 text-center">
          <Link
            to="/blog"
            className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
          >
            View all posts &rarr;
          </Link>
        </div>
      </section>
    </Layout>
  )
}

export const Head = () => <Seo title="Home" pathname="/" />

export const query = graphql`
  query HomePageQuery {
    allMdx(
      filter: { frontmatter: { date: { ne: null } } }
      sort: { frontmatter: { date: DESC } }
      limit: 3
    ) {
      nodes {
        id
        frontmatter {
          title
          slug
          date
          category
          hero_image_alt
          hero_image {
            childImageSharp {
              gatsbyImageData(width: 400, height: 160, transformOptions: { cropFocus: CENTER })
            }
          }
        }
      }
    }
  }
`

export default IndexPage
