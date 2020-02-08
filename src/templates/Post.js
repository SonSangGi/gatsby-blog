import React from 'react';
import Layout from '../components/Layout';
import Head from '../components/Head';
import { graphql } from 'gatsby';

export default props => {
  const post = props.data.markdownRemark;
  const siteTitle = props.data.site.siteMetadata.title;
  const { previous, next } = props.pageContext;

  console.log(props);

  return (
    <Layout>
      <Head title={post.frontmatter.title} description={post.excerpt} />
      <h1>{post.frontmatter.title}</h1>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </Layout>
  );
};

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      fields {
        slug
      }
      frontmatter {
        title
        date
        category
      }
    }
  }
`;
