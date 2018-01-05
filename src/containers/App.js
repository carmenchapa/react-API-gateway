import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { selectCategory, styleCategories, fetchCategories, fetchProducts } from '../actions'

import Picker from '../components/Picker'
import Categories from '../components/Categories'
import Products from '../components/Products'

class App extends Component {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    dispatch: PropTypes.func.isRequired
  }


  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchCategories())
    dispatch(fetchProducts())
  }

  componentWillReceiveProps(nextProps) {
    // console.log(nextProps.category)
    const {categories} = this.props
    if (nextProps.category !== this.props.category) {
      const { dispatch } = nextProps
      dispatch(fetchCategories())
      dispatch(fetchProducts())
    }

    //check why is this important
    this.setState((prevState, props) => {
      return props.categories.map((categories, i) => {return {id: i, selected: false}})
    })

  }

  getCategory = (nextCategory, index) => {

    this.props.dispatch(selectCategory(nextCategory))
    this.props.dispatch(styleCategories(nextCategory))
    this.props.dispatch(fetchProducts())

  }

  handleSearch = (e) => {
    e.preventDefault()
    const browse = e.target.input.value
    this.props.dispatch(fetchProducts(browse))
  }

  render() {
    const { categories, products, styles } = this.props

    return (
      <div>
        <div>            
            <Categories categories={categories} getCategory={this.getCategory} styles={styles} />
            <Picker getValue={this.handleSearch}/>
            <Products products={products}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { category, categoriesList, productsListByCategory, styledCategoriesList } = state
  const {
    categories
  } = categoriesList[category] || {
    categories: []
  }
  const {
    products
  } = productsListByCategory[category] || {
    products: []
  }
  const {
    styles
  } = styledCategoriesList[category] || {
    styles: []
  }

  return {
    categories,
    products,
    styles
  }
}

export default connect(mapStateToProps)(App)
