export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS'
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS'
// export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'

export const RECEIVE_CATEGORY = 'RECEIVE_CATEGORY'

export const SELECT_CATEGORY = 'SELECT_CATEGORY'
// export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

// export const INVALIDATE_CATEGORY = 'INVALIDATE_CATEGORY'

// export const selectSubreddit = subreddit => ({
//   type: SELECT_SUBREDDIT,
//   subreddit
// })

export const selectCategory = category => ({
  type: SELECT_CATEGORY,
  category
})

// export const invalidateSubreddit = subreddit => ({
//   type: INVALIDATE_SUBREDDIT,
//   subreddit
// })

// export const invalidateCategory = category => ({
//   type: INVALIDATE_CATEGORY,
//   category
// })

export const requestPosts = subreddit => ({
  type: REQUEST_POSTS,
  subreddit
})

export const receivePosts = (json) => ({
  type: RECEIVE_POSTS,
  // subreddit,
  // posts: json.data.children.map(child => child.data),
  posts: json.data.filter(child => child.hidden === false),

})

export const requestProducts = subreddit => ({
  type: REQUEST_PRODUCTS,
  subreddit
})


export const receiveProducts = (subreddit, json, category) => ({
  type: RECEIVE_PRODUCTS,
  products: json.data.filter(child => child.categories.some(kid => kid.title===category))
})

export const receiveCategory = (subreddit, json) => {
	return (dispatch, getState) => {
	  const category = getState().selectedCategory
	  console.log(category)
	  dispatch(receiveProducts(subreddit, json, category))
	}  
}


export const fetchPosts = subreddit => dispatch => {
  dispatch(requestPosts())
  return fetch(`https://api.gousto.co.uk/products/v2.0/categories`)

    .then(response => response.json())
    .then(json => dispatch(receivePosts( json)))
}


export const fetchProducts = subreddit => dispatch => {
  dispatch(requestProducts(subreddit))
  // return fetch(`https://www.reddit.com/r/${category}.json`)
  return fetch(`https://api.gousto.co.uk/products/v2.0/products?includes[]=categories&includes[]=attributes&sort=position&image_sizes[]=365&image_sizes[]=400&period_id=120`)

    .then(response => response.json())
    .then(json => dispatch(receiveCategory(subreddit, json)))
}
