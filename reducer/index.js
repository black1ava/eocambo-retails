import { v4 as uuidv4 } from 'uuid';

const initialState= {
  products: [],
  productsInCart: [],
  user: null,
  total: 0,
  companyInfo: [],
  promotions: [],
  loginAttempt: 0,
  orders: [],
  code: 'en',
  orderType: [],
  slides: [],
};

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
              amount: action.amount,
              order: false,
              variations_id: action.variations_id
            }
          ]
        };


      case 'UPDATE_TO_CART':
        return {
          ...state,
          productsInCart: state.productsInCart.map(function(productInCart){
            if(productInCart.id === action.id){
              return {
                ...productInCart,
                amount: action.amount
              };
            }

            return productInCart
          })
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

        case 'SET_TOTAL':
          return {
            ...state,
            total: action.payload
          };

        case 'ORDER_PRODUCTS_IN_CART':
          return {
            ...state,
            productsInCart: []
          };

        case 'SET_COMPANY_INFO':
          return {
            ...state,
            companyInfo: action.payload
          };

        case 'SET_PROMOTIONS':
          return {
            ...state,
            promotions: action.payload
          };

        case 'UPDATE_PROFILE':
          return {
            ...state,
            user: {
              ...state.user,
              name: action.payload.name,
              email: action.payload.email,
              mobile: action.payload.mobile
            }
          };

        case 'SET_LOGIN_ATTEMPT':
          return {
            ...state,
            loginAttempt: state.loginAttempt + 1
          };

        case 'ADD_ORDER':
          return {
            ...state,
            orders: [
              ...state.orders,
              action.payload
            ]
          };

        case 'CHANGE_LANGUAGE':
          return {
            ...state,
            code: action.payload
          }

        case 'SET_ORDER_TYPE':
          return {
            ...state,
            orderType: action.payload
          }

        case 'SET_SLIDES':
          return {
            ...state,
            slides: action.payload
          };

    default:
      return state;
  }
}