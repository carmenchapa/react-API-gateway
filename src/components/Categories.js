import React from 'react'
import PropTypes from 'prop-types'


const Categories = ({posts, getCategory}) => (
  <ul>
    {posts.map((post, i) =>
      <li key={i} onClick={()=>getCategory(post.title)} style={{ display: 'inline-block', padding: '20px' }}>{post.title}</li>
    )}
  </ul>
)

Categories.propTypes = {
  posts: PropTypes.array.isRequired
}

export default Categories
