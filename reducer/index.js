import { products } from '../Shared/products';

let initialState= {
  products
}

export default function reducer(state = initialState, action){
  switch(action.type){
    case 'ADD_TO_FAVORITE_ACTIVE':
      return {
        ...state,
        products: state.products.map(function(product){
          if(product.id === action.payload){
            return {
              ...product,
              favorite: true
            }
          }

          return product;
        })
      };

      case 'ADD_TO_FAVORITE_INACTIVE':
        return {
          ...state,
          products: state.products.map(function(product){
            if(product.id === action.payload){
              return {
                ...product,
                favorite: false
              }
            }

            return product;
          })
        };

    default:
      return state;
  }
}