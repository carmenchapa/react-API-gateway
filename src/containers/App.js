import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectCategory, fetchPosts, fetchProducts, fetchSearch } from '../actions'

import Picker from '../components/Picker'
import Categories from '../components/Categories'
import Products from '../components/Products'

class App extends Component {
  static propTypes = {
    posts: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props
    dispatch(fetchPosts(selectedSubreddit))
    dispatch(fetchProducts(selectedSubreddit))

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = nextProps
      dispatch(fetchPosts())
      dispatch(fetchProducts(selectedSubreddit))
    }
  }

  getCategory = (nextSubreddit) => {
    console.log(nextSubreddit);
    this.props.dispatch(selectCategory(nextSubreddit))
    this.props.dispatch(fetchProducts())
  }

  handleSearch = (e, nextSubreddit) => {
    e.preventDefault()
    let browse = e.target.input.value
    this.props.dispatch(fetchProducts(browse))
  }


  render() {
    const { posts, products } = this.props
    return (
      <div>
           <div>            
              <Categories posts={posts} getCategory={this.getCategory} />
              <Picker getValue={this.handleSearch}/>
              <Products products={products}/>
            </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { selectedSubreddit, postsBySubreddit, productsBySubreddit } = state
  const {
    items: posts
  } = postsBySubreddit[selectedSubreddit] || {
    items: []
  }
  const {
    products
  } = productsBySubreddit[selectedSubreddit] || {
    products: []
  }

  return {
    posts,
    products
  }
}

export default connect(mapStateToProps)(App)
