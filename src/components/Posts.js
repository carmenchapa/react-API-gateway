import React from 'react'
import PropTypes from 'prop-types'



//defining handle to show producs in categorises
const handleClick = (e) => {
    console.log('eee');
}

const Posts = ({posts}) => (
  <ul>
    {posts.map((post, i) =>
      <li key={i} onClick={(e) => handleClick(e)} style={{ display: 'inline-block', padding: '20px' }}>{post.title}</li>

    )}
  </ul>
)

Posts.propTypes = {
  posts: PropTypes.array.isRequired
  // handleClick: PropTypes.func(e) {console.log('eee');}
}

export default Posts
