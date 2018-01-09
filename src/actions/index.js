export const REQUEST_CATEGORIES = 'REQUEST_CATEGORIES'
export const RECEIVE_CATEGORIES = 'RECEIVE_CATEGORIES'

export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS'
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS'

export const RECEIVE_CATEGORY = 'RECEIVE_CATEGORY'

export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const STYLE_CATEGORIES = 'STYLE_CATEGORIES'

export const selectCategory = category => ({
  type: SELECT_CATEGORY,
  category
})

export const getCategoriesList = (index) => {
	return (dispatch, getState) => {
	  const categories = Object.values(getState().categoriesList)[0].categories
	  const categoriesStyleList = categories.map((category, i) => {return {id: category.title, selected: (category.title===index ) ? true : false }})
	  dispatch(styleCategories(categoriesStyleList))
	}
}

export const styleCategories = (categoriesStyleList) => ({
  type: STYLE_CATEGORIES,
  categoriesStyles: categoriesStyleList,
})

export const requestCategories = subreddit => ({
  type: REQUEST_CATEGORIES,
})

export const receiveCategories = (json) => ({
  type: RECEIVE_CATEGORIES,
  categoriesItems: json.data.filter(child => child.hidden === false),
})

export const requestProducts = subreddit => ({
  type: REQUEST_PRODUCTS,
})

export const getCategory = (json, browse) => {
	return (dispatch, getState) => {
	  const category = getState().selectedCategory
      dispatch(getCategoriesList(category))
	  dispatch(receiveProducts( json, category, browse))
	}  
}

export const receiveProducts = (json, category, browse) => ({
  type: RECEIVE_PRODUCTS,
  productsItems: json.data.filter(child => child.categories.some(kid => kid.title===category) && child.title.match(browse))
})

export const fetchCategories = () => dispatch => {
  dispatch(requestCategories())
  return fetch(`https://api.gousto.co.uk/products/v2.0/categories`)
    .then(response => response.json())
    .then(json => dispatch(receiveCategories(json)))
}

export const fetchProducts = (browse = "") => dispatch => {
  dispatch(requestProducts())
  return fetch(`https://api.gousto.co.uk/products/v2.0/products?includes[]=categories&includes[]=attributes&sort`)
    .then(response => response.json())
    .then(json => dispatch(getCategory(json, browse)))
}
