import React, { Component } from 'react'
import PropTypes from 'prop-types'

const ulStyle = {
	paddingLeft: '60px',
	paddingTop: '30px'
}

const hidden = {
	display: 'none',
}
const nonHidden = {
	display: 'block',
	fontWeight: 'normal'
}
const regular = {
	listStyleType: 'none'
}
const bolder = {
	display: 'block',
	fontWeight: 'bold',
	// paddingTop: '5px'
}


class Products extends Component {

	static propTypes = {
	products: PropTypes.array.isRequired
	}

	constructor(props) {
	    super(props);
    	this.handleChange = this.handleChange.bind(this)	
	}

	componentWillReceiveProps(nextProps){
		this.setState((prevState, props) => {
		  return props.products.map((products, i) => {return {id: i, isVisible: false}})
		}); 
	}

	handleChange = (index) => {
        this.setState((state, props) => {
			return props.products.map((products, i) => {return {id: i, isVisible: (i===index && !this.state[index].isVisible) ? true : (i===index && this.state[index].isVisible) ? false : this.state[i].isVisible}})
       });
    }

	render() {
		return(
			<ul style={ulStyle}>
				{this.props.products.map((products, i) =>				
				  <li key={products.id} style={this.state[i].isVisible ? bolder : regular} onClick={(e) => this.handleChange(i)} >{products.title} 
				  <Description key={products.id} products={products} style={this.state[i].isVisible ? nonHidden : hidden} />
				  </li>
				)}
			</ul>
		)
	}
}

const Description = ({...props}) => <p style={props.style} >{props.products.description}</p>


export default Products