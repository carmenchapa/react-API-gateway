import { combineReducers } from 'redux'
import {
  SELECT_CATEGORY, STYLE_CATEGORIES,

  REQUEST_CATEGORIES, RECEIVE_CATEGORIES,

  REQUEST_PRODUCTS, RECEIVE_PRODUCTS
} from '../actions'



//check this file, what is needed and what's not 
const styles = (state = {
	styles: [],
}, action) => {
	switch (action.type) {
		case STYLE_CATEGORIES:
		return {
			...state,
		}
	
	default:
      return state
  }
}

const categories = (state = {
  categories: [],
  styles: [],
}, action) => {
  switch (action.type) {

    case REQUEST_CATEGORIES:
      return {
        ...state,
      }
    case RECEIVE_CATEGORIES:
    case STYLE_CATEGORIES:

      return {
        ...state,
        categories: action.categoriesItems,
        styles: action.categoriesStyles
      }
    // case STYLE_CATEGORIES:
      // return {
      //   ...state,
      //   categories: action.categoriesItems,
      //   styles: action.categoriesItems.map((category, i) => {return {id: category.title, selected: false}})
      // }

    default:
      return state
  }
}




const products = (state = {
  products: []
}, action) => {
  switch (action.type) {

    case REQUEST_PRODUCTS:
      return {
        ...state,
      }
    case RECEIVE_PRODUCTS:
      return {
        ...state,
        products: action.productsItems
      } 

    default:
      return state
  }
}

const selectedCategory = (state = 'Drinks Cabinet', action) => {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.category
    default:
      return state
  }
}

const styledCategoriesList = (state = { }, action) => {
  switch (action.type) {
    case STYLE_CATEGORIES:
    	return {
    		...state,
    		[action.categories]: categories(state[action.categories], action)
    	}
    default:
      return state
    	}
}

const categoriesList = (state = { }, action) => {
  switch (action.type) {
  	case SELECT_CATEGORY:
    case RECEIVE_CATEGORIES:
    case REQUEST_CATEGORIES:
      return {
        ...state,
        [action.categories]: categories(state[action.categories], action)
      }
    default:
      return state
  }
}

const productsListByCategory = (state = { }, action) => {
  switch (action.type) {
    case RECEIVE_PRODUCTS:
    case REQUEST_PRODUCTS:
      return {
        ...state,
        [action.products]: products(state[action.products], action)
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  categoriesList,
  productsListByCategory,
  selectedCategory,
  styledCategoriesList
})

export default rootReducer