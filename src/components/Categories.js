import React, { Component } from 'react'
import PropTypes from 'prop-types'

const nonselected = {
	display: 'inline-block',
	padding: '20px'
}

const selected = {
	display: 'inline-block',
	padding: '20px',
	fontWeight: 'bold',
	textDecoration: 'underline'
}

// const Categories = ({posts, getCategory}) => (
class Categories extends Component {
	static propTypes = {
	categories: PropTypes.array.isRequired,
	styles: PropTypes.array.isRequired
	}

	render(){
		
		return(
		  <ul>
		    {this.props.categories.map((categories, i) =>
		      <li key={i} onClick={()=>this.props.getCategory(categories.title, i)} style={ (this.props.styles[i] && this.props.styles[i].selected === true) ? selected : nonselected }>{categories.title}</li>
		    )}
		  </ul>
		)
	}
}


Categories.propTypes = {
  categories: PropTypes.array.isRequired
}

export default Categories
