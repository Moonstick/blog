import * as React from 'react'
import { StaticImage } from 'gatsby-plugin-image'
import Layout from '../components/layout'
import Seo from '../components/seo'

const AboutPage = () => {
  return (
    <Layout pageTitle="About Me">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row gap-10 items-start mb-10">
          <div className="flex-shrink-0">
            <StaticImage
              src="../images/photo.jpg"
              alt="David O'Brien"
              width={140}
              height={140}
              imgStyle={{ borderRadius: '50%', objectFit: 'cover' }}
              className="rounded-full ring-4 ring-indigo-100"
            />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-1">David O&apos;Brien</h2>
            <p className="text-indigo-600 font-medium mb-4">
              Principal Craftsman at{' '}
              <a
                href="https://www.codurance.com"
                className="underline hover:text-indigo-800"
                target="_blank"
                rel="noreferrer"
              >
                Codurance
              </a>
            </p>
            <a
              href="https://www.linkedin.com/in/davidobrien"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Connect on LinkedIn
            </a>
          </div>
        </div>

        <div className="prose prose-slate prose-lg max-w-none">
          <p>
            Hi, my name is David O&apos;Brien and I work as a software consultant, which generally
            involves working with teams of people to design and build systems. I&apos;m currently
            working for{' '}
            <a href="https://www.codurance.com" target="_blank" rel="noreferrer">
              Codurance
            </a>{' '}
            as one of their Principal Craftsmen.
          </p>
          <p>
            As well as being interested in using software to solve problems, I&apos;m also a bit of
            an amateur cook &mdash; and some of that will probably find its way into the posts I
            make here.
          </p>
          <p>
            I&apos;ve been promising myself I&apos;ll blog more regularly for quite a long time, so
            this is my effort to do that &mdash; mostly as a way of documenting some of the things I
            learn, as well as making me more intentional about starting (and finishing) at least some
            of the projects I&apos;ve been ruminating about for the last decade or two.
          </p>
          <p>
            The blog is primarily focused on technical topics: systems design, software design
            patterns, AI, and whatever else I find myself deep in at the time.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export const Head = () => (
  <Seo
    title="About Me"
    pathname="/about"
    description="About David O'Brien — Principal Craftsman at Codurance, software consultant, and technical blogger."
  />
)

export default AboutPage
