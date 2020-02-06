import React from "react"
import { Link, graphql, useStaticQuery } from "gatsby"
import Img from "gatsby-image"
import "./Sidebar.scss"
import Icon from "../Icon"

const Sidebar = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author
          description
          title
          contacts {
            github
            email
          }
        }
      }
      allMarkdownRemark {
        categories: group(field: frontmatter___category) {
          name: fieldValue
          count: totalCount
        }
      }
      sidebarFile: file(relativePath: { eq: "sidebar.jpg" }) {
        childImageSharp {
          fluid {
            src
          }
        }
      }
      avatar: file(relativePath: { eq: "icon.png" }) {
        childImageSharp {
          fluid(maxWidth: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  const { author, description, title, contacts } = data.site.siteMetadata
  const { categories } = data.allMarkdownRemark
  const { src } = data.sidebarFile.childImageSharp.fluid
  const fluid = data.avatar.childImageSharp.fluid

  console.log(title)

  return (
    <div className="sidebar">
      <div className="sidebar-bg" style={{ backgroundImage: `url(${src})` }} />
      <div className="sidebar-contents">
        <div className="sidebar-about">
          <h1>
            <Link to="/">{author}</Link>
          </h1>
          <p>{description}</p>
        </div>
        <div className="sidebar-category">
          <ul>
            <li>
              <Link to="/">All</Link>
            </li>
            <li>
              <Link to="/">All</Link>
            </li>
            <li>
              <Link to="/">All</Link>
            </li>
            {categories.map(c => (
              <li key={c.name}>
                <Link to="/">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="sidebar-profile">
          <Img className="avatar" fluid={fluid} />
          <p>{description}</p>
        </div>
        <a href={contacts["github"]} target="_blank" rel="noopener noreferrer">
          <Icon name="github" />
        </a>
        <a href={contacts["email"]} target="_blank" rel="noopener noreferrer">
          <Icon name="email" />
        </a>
      </div>
    </div>
  )
}

export default Sidebar