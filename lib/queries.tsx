import groq from 'groq'

const postFields = groq`
  _id,
  name,
  title,
  date,
  excerpt,
  coverImage,
  "slug": slug.current,
  "author": author->{name, picture},
`

export const settingsQuery = groq`*[_type == "settings"][0]{title}`

export const indexQuery = groq`
*[_type == "post"] | order(date desc, _updatedAt desc) {
  ${postFields}
}`

// Post queries
export const postQuery = groq`
{
  "post": *[_type == "post" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${postFields}
  },
  "morePosts": *[_type == "post" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${postFields}
  }
}`

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`

export const postBySlugQuery = groq`
*[_type == "post" && slug.current == $slug][0] {
  ${postFields}
}
`

// Author queries

const authorFields = groq`
  _id,
  name,
  picture,
  bio
`

export const authorQuery = groq`
{
  "author": *[_type == "author" && slug.current == $slug] | order(_updatedAt desc) [0] {
    content,
    ${authorFields}
  },
  "moreauthors": *[_type == "author" && slug.current != $slug] | order(date desc, _updatedAt desc) [0...2] {
    content,
    ${authorFields}
  }
}`

export const authorSlugsQuery = groq`
*[_type == "author" && defined(slug.current)][].slug.current
`

export const authorBySlugQuery = groq`
*[_type == "author" && slug.current == $slug][0] {
  ${authorFields}
}
`
