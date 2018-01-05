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

	// const initialState = {
	//     styles: [],
	// };
	constructor(props) {
	    super(props)    	
	}
	
	componentWillReceiveProps(nextProps){
		this.setState((prevState, props) => {
			console.log(props.styles)
			return props.styles
			// return props.categories.map((posts, i) => {return {id: i, selected: false}})
			  // return this.state === null || {} ? (props.categories.map((categories, i) => {return {id: i, selected: false}})) : this.state
		}); 

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
// style={ this.props.styles[i].selected ? selected : nonselected }
// style={ Object.values(this.props.styles[i]).selected ? selected : nonselected }

}


Categories.propTypes = {
  categories: PropTypes.array.isRequired
}

export default Categories
