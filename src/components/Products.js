import React, { Component } from 'react'
import PropTypes from 'prop-types'


const hidden = {
	display: 'none',
}
const nonHidden = {
	display: 'inline-block',
	fontWeight: 'normal'
}
const bolder = {
	fontWeight: 'bold'
}




class Products extends Component {

	static propTypes = {
	products: PropTypes.array.isRequired
	}

	constructor(props) {
	    super(props);
	    // this.state = { isVisible: false }
	    // this.state = {x:  props}
	    // .map((products, i) => {return {id: i, isVisible: false}})
    	this.toggleClass = this.toggleClass.bind(this)
    	this.handleChange = this.handleChange.bind(this)	
	}

	componentWillReceiveProps(nextProps){
		this.setState((prevState, props) => {
			// return ({props})
		  return props.products.map((products, i) => {return {id: i, isVisible: false}})
		  // return {index: { id: 1, isVisible: false}, index: { id: 1, isVisible: false}, index: { id: 1, isVisible: false}}

		}); 
	}

	onButtonClicked (number) {
	    console.log(`Button ${number} was clicked`)
	    console.log(this)
	  }

 	toggleClass = (e) => {
		console.log('aaa')
		console.log(this)
		console.log(this.state)
		this.setState({
	      isVisible: !this.state.isVisible
	    })
	    // this.props.openPanel(this.props.buttonNumber)
	}

	handleChange(id, isVisible, index) {
		console.log(this.props[index])
		console.log(this.props.products[index])
		console.log(this.props.products)
		console.log(id)
		console.log(index)
		console.log(this.state)
		console.log(this.state[index])
		console.log(this.state[index].isVisible)
		// if(this.state.name.includes('test')){
		// this.setState(...)	
		// } else {
		// 	this.setState?////
		// }
        this.setState((state, props) => {
        	// console.log(index)
        	// let index = {id: index, isVisible: true}
        	// return {...state, index}
			return props.products.map((products, i) => {return {id: i, isVisible: i===index && this.state[index].isVisible === false ? true : false}})
       });
    }

	render() {
		return(
			<ul>
				{this.props.products.map((products, i) =>
				
				  <li key={products.id} id={i} style={this.state[i].isVisible ? bolder : null} onClick={(e) => this.handleChange(products.id, true, i)} >{products.title} 
				  <Description key={products.id} id={products.id} ref={(i) => {this.i = i}} name={i} products={products}  buttonNumber={i} openPanel={this.onButtonClicked} style={this.state[i].isVisible ? nonHidden : hidden} />
				  </li>
				)}
				
			</ul>
			)
	}
}



class Description extends Component {
	render(){
		return(
			<p ref={(i) => {this.i = i}} style={this.props.style} >{this.props.products.description}</p>
		)
	}
}

/* <p onClick={(e) => this.onClick(e)} style={this.state.isButtonActive ? this.hidden : this.nonHidden}>{this.props.products.description}</p> */


export default Products