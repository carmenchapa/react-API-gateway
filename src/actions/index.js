export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS'
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS'

export const RECEIVE_CATEGORY = 'RECEIVE_CATEGORY'

export const SELECT_CATEGORY = 'SELECT_CATEGORY'

export const selectCategory = category => ({
  type: SELECT_CATEGORY,
  category
})

export const requestPosts = subreddit => ({
  type: REQUEST_POSTS,
  // subreddit
})

export const receivePosts = (json) => ({
  type: RECEIVE_POSTS,
  // subreddit,
  // posts: json.data.children.map(child => child.data),
  posts: json.data.filter(child => child.hidden === false),
})

export const requestProducts = subreddit => ({
  type: REQUEST_PRODUCTS,
  // subreddit
})

export const receiveCategory = (json, browse) => {
	return (dispatch, getState) => {
	  const category = getState().selectedCategory
	  // let browse = ""
	  console.log(category)
	  dispatch(receiveProducts( json, category, browse))
	}  
}

export const receiveProducts = (json, category, browse) => ({
  type: RECEIVE_PRODUCTS,
  products: json.data.filter(child => child.categories.some(kid => kid.title===category) && child.title.match(browse))
})


export const fetchPosts = subreddit => dispatch => {
  dispatch(requestPosts())
  return fetch(`https://api.gousto.co.uk/products/v2.0/categories`)
    .then(response => response.json())
    .then(json => dispatch(receivePosts(json)))
}

export const fetchProducts = (browse = "") => dispatch => {
	// console.log(browse)
  dispatch(requestProducts())
  return fetch(`https://api.gousto.co.uk/products/v2.0/products?includes[]=categories&includes[]=attributes&sort`)
    .then(response => response.json())
    .then(json => dispatch(receiveCategory(json, browse)))
}

