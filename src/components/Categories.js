import React, { Component } from 'react'
import PropTypes from 'prop-types'


// const Categories = ({posts, getCategory}) => (
class Categories extends Component {

	render(){
		return(
		  <ul>
		    {this.props.posts.map((post, i) =>
		      <li key={i} onClick={()=>this.props.getCategory(post.title)} style={{ display: 'inline-block', padding: '20px' }}>{post.title}</li>
		    )}
		  </ul>
		)
	}
}
// )

Categories.propTypes = {
  posts: PropTypes.array.isRequired
}

export default Categories
