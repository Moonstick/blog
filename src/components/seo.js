import * as React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

const Seo = ({ title, description, pathname = '/', article = false, image, publishedTime }) => {
  const { site } = useStaticQuery(graphql`
    query SeoQuery {
      site {
        siteMetadata {
          title
          description
          siteUrl
          author
        }
      }
    }
  `)

  const meta = site.siteMetadata
  const metaTitle = title ? `${title} | ${meta.title}` : meta.title
  const metaDescription = description || meta.description
  const canonicalUrl = `${meta.siteUrl}${pathname}`
  const ogImage = image || `${meta.siteUrl}/og-image.png`

  const jsonLd = article
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: title,
        description: metaDescription,
        url: canonicalUrl,
        datePublished: publishedTime,
        author: { '@type': 'Person', name: meta.author, url: meta.siteUrl },
        ...(image && { image }),
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: meta.title,
        description: metaDescription,
        url: meta.siteUrl,
        author: { '@type': 'Person', name: meta.author },
      }

  return (
    <>
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:site_name" content={meta.title} />
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:title" content={title || meta.title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      {article && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || meta.title} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </>
  )
}

export default Seo
