import React from 'react';
import Layout from '../components/Layout';
import Head from '../components/Head';
import { graphql } from 'gatsby';
import Page from '../components/Page';

// data: 현재 페이지에서 export한 query
// pageContext: create-node에서 넘겨준 context 오브젝트
const Category = ({ data, pageContext }) => {
  const {
    category,
    currentPage,
    limit,
    skip,
    pageRangeDisplayed,
  } = pageContext;

  const { edges } = data.allMarkdownRemark;

  return (
    <Layout>
      <Head title={`${category}-${currentPage}`} />
      <Page edges={edges} />
    </Layout>
  );
};

export default Category;

// create-node에서 넘겨준 값으로 query 실행
export const query = graphql`
  query CategoryPageQuery($category: String, $limit: Int!, $skip: Int!) {
    allMarkdownRemark(
      limit: $limit
      skip: $skip
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            category
            title
            date
          }
        }
      }
    }
  }
`;
