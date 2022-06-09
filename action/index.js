export function addToFavoriteActive(payload){
  return {
    type: 'ADD_TO_FAVORITE_ACTIVE',
    payload
  };
}

export function addToFavoriteInactive(payload){
  return {
    type: 'ADD_TO_FAVORITE_INACTIVE',
    payload
  };
}

export function addToCartActive(payload){
  return {
    type: 'ADD_TO_CART_ACTIVE',
    payload
  };
}

export function addToCartInactive(payload){
  return {
    type: 'ADD_TO_CART_INACTIVE',
    payload
  };
}