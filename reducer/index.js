import { v4 as uuidv4 } from 'uuid';

let initialState= {
  products: [],
  productsInCart: [],
  user: null
}

export default function reducer(state = initialState, action){
  switch(action.type){

    case 'ADD_PRODUCTS':
      return {
        ...state,
        products: action.payload
      };

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

      case 'ADD_TO_CART':
        return {
          ...state,
          productsInCart: [
            ...state.productsInCart,
            {
              id: uuidv4(),
              productId: action.productId,
              amount: action.amount
            }
          ]
        };

        case 'REMOVE_FROM_CART':
          return {
            ...state,
            productsInCart: state.productsInCart.filter(function(product){
              return product.id !==  action.payload
            })
          };

        case 'INCREASE_PRODUCT_IN_CART':
          return {
            ...state,
            productsInCart: state.productsInCart.map(function(productInCart){
              if(productInCart.id === action.payload){
                return {
                  ...productInCart,
                  amount: productInCart.amount + 1
                };
              }

              return productInCart;
            })
          };

        case 'DECREASE_PRODUCT_IN_CART':
          return {
            ...state,
            productsInCart: state.productsInCart.map(function(productInCart){
              if(productInCart.id === action.payload){
                return {
                  ...productInCart,
                  amount: productInCart.amount - 1
                };
              }

              return productInCart;
            })
          };

        case 'SET_USER':
          return {
            ...state,
            user: action.payload
          };

    default:
      return state;
  }
}