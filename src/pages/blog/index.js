import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/layout'
import Seo from '../../components/seo'

const BlogPage = ({ data }) => {
    console.log(data.allMdx.nodes);
    return (
      <Layout pageTitle="My Blog Posts">
        <ul>
        {
          data.allMdx.nodes.map(node => (
              <article key={node.id}>
              
              <h2>
                <Link to={`/blog/${node.frontmatter.slug}`}>
                {node.frontmatter.title}
                </Link>
              </h2>
              <p>Posted: {node.frontmatter.date}</p>
              <p>{node.excerpt}</p>
            </article>
          ))
        }
        </ul>
      </Layout>
    )
  }

export const query = graphql`
query MyQuery {
  allMdx(filter:{frontmatter: {date: { ne: null } } },sort: { frontmatter: { date: DESC } } ) {
    nodes {
      frontmatter {
        date(formatString: "MMMM D, YYYY")
        slug
        title        
      }
      id
      excerpt
    }
  }
}
`

export const Head = () => <Seo title="My Blog Posts" />

export default BlogPage