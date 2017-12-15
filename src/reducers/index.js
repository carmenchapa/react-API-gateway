import { combineReducers } from 'redux'
import {
  // SELECT_SUBREDDIT, 
  SELECT_CATEGORY,

  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS, RECEIVE_POSTS,

  REQUEST_PRODUCTS, RECEIVE_PRODUCTS
} from '../actions'

const selectedCategory = (state = 'Drinks Cabinet', action) => {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.subreddit
    default:
      return state
  }
}

// const selectedSubreddit = (state = 'reactjs', action) => {
//   switch (action.type) {
//     case SELECT_SUBREDDIT:
//       return action.subreddit
//     default:
//       return state
//   }
// }

const posts = (state = {
  // isFetching: false,
  // didInvalidate: false,
  items: [],
  products: []
}, action) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return {
        ...state,
        // didInvalidate: true
      }
    case REQUEST_POSTS:
      return {
        ...state,
        // isFetching: true,
        // didInvalidate: false
      }
    case RECEIVE_POSTS:
      return {
        ...state,
        // isFetching: false,
        // didInvalidate: false,
        items: action.posts
        // lastUpdated: action.receivedAt
      }
    case REQUEST_PRODUCTS:
      return {
        ...state,
        // isFetching: true,
        // didInvalidate: false
      }
    case RECEIVE_PRODUCTS:
      return {
        ...state,
        // isFetching: false,
        // didInvalidate: false,
        products: action.products
        // lastUpdated: action.receivedAt
      } 
    default:
      return state
  }
}

////
const postsBySubreddit = (state = { }, action) => {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
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
    case INVALIDATE_SUBREDDIT:
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
  productsBySubreddit
  /*,
  selectedSubreddit*/
})

export default rootReducer