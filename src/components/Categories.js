import React from 'react'
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

const Categories = ({...props}) => {
	return(
		  <ul>
		    {props.categories.map((categories, i) =>
		      <li key={i} onClick={()=>props.getCategory(categories.title, i)} style={ (props.styles[i] && props.styles[i].selected === true) ? selected : nonselected }>{categories.title}</li>
		    )}
		  </ul>
		)
}
Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  styles: PropTypes.array.isRequired
}

export default Categories
