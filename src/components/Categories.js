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
	posts: PropTypes.array.isRequired
	}
	constructor(props) {
	    super(props);
    	this.handleClick = this.handleClick.bind(this)	
	}

	componentWillReceiveProps(nextProps){
		this.setState((prevState, props) => {
			console.log("state: ", this.state)
			console.log("prevState: ", prevState)
			// if (prevState) {
			  return props.posts.map((posts, i) => {return {id: i, selected: false}})
			// }
		// else {
		// 	return prevState
		// }
		}); 
	}

	handleClick(index, title){
		this.setState((state, props) => {
			console.log(state)
			return props.posts.map((posts, i) => {return {id: i, selected: (i===index && !this.state[index].selected) ? true : (i===index && this.state[index].selected) ? false : this.state[i].selected}})
       });
		console.log(this.state)

		this.props.getCategory(title)
	}

	render(){
		return(
		  <ul>
		    {this.props.posts.map((post, i) =>
		      <li key={i} onClick={()=>this.handleClick(i, post.title)} style={ this.state[i].selected ? selected : nonselected }>{post.title}</li>
		    )}
		  </ul>
		)
	}

	// render(){
	// 	return(
	// 	  <ul>
	// 	    {this.props.posts.map((post, i) =>
	// 	      <li key={i} onClick={()=>this.props.getCategory(post.title)} style={ nonselected }>{post.title}</li>
	// 	    )}
	// 	  </ul>
	// 	)
	// }
}
// )

Categories.propTypes = {
  posts: PropTypes.array.isRequired
}

export default Categories
