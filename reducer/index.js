import { products } from '../Shared/products';
import { v4 as uuidv4 } from 'uuid';

let initialState= {
  products,
  productsInCart: []
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
              };
            }

            return product;
          })
        };

      case 'ADD_TO_CART_ACTIVE':
        return {
          ...state,
          products: state.products.map(function(product){
            if(product.id === action.payload){
              return {
                ...product,
                inCart: true
              };
            }

            return product;
          }),
          productsInCart: [
            ...state.productsInCart,
            {
              id: uuidv4(),
              product_id: action.payload
            }
          ]
        };

        case 'ADD_TO_CART_INACTIVE':
          return {
            ...state,
            products: state.products.map(function(product){
              if(product.id === action.payload){
                return {
                  ...product,
                  inCart: false
                };
              }

              return product;
            }),
            productsInCart: state.productsInCart.filter(function(product){
              return product.id !==  payload
            })
          };

    default:
      return state;
  }
}