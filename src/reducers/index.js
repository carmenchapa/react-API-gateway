import { combineReducers } from 'redux'
import {
  SELECT_CATEGORY,

  REQUEST_POSTS, RECEIVE_POSTS,

  REQUEST_PRODUCTS, RECEIVE_PRODUCTS
} from '../actions'

const selectedCategory = (state = 'Drinks Cabinet', action) => {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.category
    default:
      return state
  }
}


const posts = (state = {
  items: [],
  products: []
}, action) => {
  switch (action.type) {

    case REQUEST_POSTS:
      return {
        ...state,
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        items: action.posts
      }
    case REQUEST_PRODUCTS:
      return {
        ...state,
      }
    case RECEIVE_PRODUCTS:
      return {
        ...state,
        products: action.products
      } 

    default:
      return state
  }
}

const postsBySubreddit = (state = { }, action) => {
  switch (action.type) {
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return {
        ...state,
        [action.subreddit]: posts(state[action.subreddit], action)
      }
    default:
      return state
  }
}

const productsBySubreddit = (state = { }, action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
    case REQUEST_PRODUCTS:
      return {
        ...state,
        [action.subreddit]: posts(state[action.subreddit], action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  postsBySubreddit,
  productsBySubreddit,
  selectedCategory
  /*,
  selectedSubreddit*/
})

export default rootReducer