import * as React from 'react'
import { Link, useStaticQuery, graphql } from 'gatsby'

const Layout = ({ pageTitle, children }) => {
  const data = useStaticQuery(graphql`
    query LayoutQuery {
      site {
        siteMetadata {
          title
          linkedIn
        }
      }
    }
  `)

  const { title, linkedIn } = data.site.siteMetadata

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="bg-slate-900">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="text-white font-semibold text-lg hover:text-indigo-300 transition-colors"
          >
            {title}
          </Link>
          <nav>
            <ul className="flex gap-6 list-none m-0 p-0">
              <li>
                <Link
                  to="/"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                  activeClassName="text-indigo-400"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                  activeClassName="text-indigo-400"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-slate-300 hover:text-white transition-colors text-sm"
                  activeClassName="text-indigo-400"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {pageTitle && (
        <div className="bg-slate-800 py-10 border-b border-slate-700">
          <div className="max-w-5xl mx-auto px-6">
            <h1 className="text-3xl font-bold text-white m-0">{pageTitle}</h1>
          </div>
        </div>
      )}

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-slate-900 text-slate-400 py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <p className="m-0">&copy; {new Date().getFullYear()} David O&apos;Brien. All rights reserved.</p>
          <div className="flex gap-4">
            <a
              href={linkedIn}
              target="_blank"
              rel="noreferrer noopener"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            <Link to="/about" className="hover:text-white transition-colors">
              About
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
