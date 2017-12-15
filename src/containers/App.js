import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { /*selectSubreddit,invalidateSubreddit,*/ selectCategory, fetchPostsIfNeeded, fetchProductsIfNeeded } from '../actions'
// import Picker from '../components/Picker'
import Posts from '../components/Posts'
import Products from '../components/Products'

class App extends Component {
  static propTypes = {
    // selectedSubreddit: PropTypes.string.isRequired,
    posts: PropTypes.array.isRequired,
    // isFetching: PropTypes.bool.isRequired,
    // lastUpdated: PropTypes.number,
    dispatch: PropTypes.func.isRequired
  }

  componentDidMount() {
    const { dispatch, selectedSubreddit } = this.props
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
    //
    dispatch(fetchProductsIfNeeded(selectedSubreddit))

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
      const { dispatch, selectedSubreddit } = nextProps
      dispatch(fetchPostsIfNeeded(selectedSubreddit))
      //
      dispatch(fetchProductsIfNeeded(selectedSubreddit))
    }
  }

  handleChange = nextSubreddit => {
    this.props.dispatch(selectCategory(nextSubreddit))
  }

  handleRefreshClick = e => {
    e.preventDefault()

    const { dispatch, selectedSubreddit } = this.props
    // dispatch(invalidateSubreddit(selectedSubreddit))
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
    //
    dispatch(fetchProductsIfNeeded(selectedSubreddit))

  }


  render() {
    const { /*selectedSubreddit,isFetching, lastUpdated*/ posts, products } = this.props
    return (
      <div>
           <div>
              <Posts posts={posts} />
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
    // isFetching: true,
    items: []
  }
  const {
    products: products
  } = productsBySubreddit[selectedSubreddit] || {
    // isFetching: true,
    products: []
  }


  return {
    selectedSubreddit,
    posts,
    products

  }
}

export default connect(mapStateToProps)(App)
