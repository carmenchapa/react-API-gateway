export const REQUEST_POSTS = 'REQUEST_POSTS'
export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS'
export const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS'
// export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'

export const SELECT_CATEGORY = 'SELECT_CATEGORY'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

export const INVALIDATE_CATEGORY = 'INVALIDATE_CATEGORY'

// export const selectSubreddit = subreddit => ({
//   type: SELECT_SUBREDDIT,
//   subreddit
// })

export const selectCategory = category => ({
  type: SELECT_CATEGORY,
  category
})

export const invalidateSubreddit = subreddit => ({
  type: INVALIDATE_SUBREDDIT,
  subreddit
})

// export const invalidateCategory = category => ({
//   type: INVALIDATE_CATEGORY,
//   category
// })

export const requestPosts = subreddit => ({
  type: REQUEST_POSTS,
  subreddit
})

export const receivePosts = (subreddit, json) => ({
  type: RECEIVE_POSTS,
  subreddit,
  // posts: json.data.children.map(child => child.data),
  posts: json.data.filter(child => child.hidden === false),

})

///
export const requestProducts = subreddit => ({
  type: REQUEST_PRODUCTS,
  subreddit
})

export const receiveProducts = (subreddit, json) => ({
  type: RECEIVE_PRODUCTS,
  subreddit,
  // posts: json.data.children.map(child => child.data),
  products: json.data.filter(child => child.categories.some(kid => kid.title==="Drinks Cabinet")),

  receivedAt: Date.now()
})
////




const fetchPosts = subreddit => dispatch => {
  dispatch(requestPosts(subreddit))
  // return fetch(`https://www.reddit.com/r/${subreddit}.json`)
  return fetch(`https://api.gousto.co.uk/products/v2.0/categories`)

    .then(response => response.json())
    .then(json => dispatch(receivePosts(subreddit, json)))
}

const shouldFetchPosts = (state, subreddit) => {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  }
  if (posts.isFetching) {
    return false
  }
  return posts.didInvalidate
}

export const fetchPostsIfNeeded = subreddit => (dispatch, getState) => {
  if (shouldFetchPosts(getState(), subreddit)) {
    return dispatch(fetchPosts(subreddit))
  }
}




///

const fetchProducts = subreddit => dispatch => {
  dispatch(requestProducts(subreddit))
  // return fetch(`https://www.reddit.com/r/${category}.json`)
  return fetch(`https://api.gousto.co.uk/products/v2.0/products?includes[]=categories&includes[]=attributes&sort=position&image_sizes[]=365&image_sizes[]=400&period_id=120`)

    .then(response => response.json())
    .then(json => dispatch(receiveProducts(subreddit, json)))
}

const shouldFetchProducts = (state, subreddit) => {
  const products = state.productsBySubreddit[subreddit]
  if (!products) {
    return true
  }
  if (products.isFetching) {
    return false
  }
  return products.didInvalidate
}

export const fetchProductsIfNeeded = subreddit => (dispatch, getState) => {
  if (shouldFetchProducts(getState(), subreddit)) {
    return dispatch(fetchProducts(subreddit))
  }
}