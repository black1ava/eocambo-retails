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

export function addToCart({ productId, amount }){
  return {
    type: 'ADD_TO_CART',
    productId,
    amount
  };
}

export function removeFromCart(payload){
  return {
    type: 'REMOVE_FROM_CART',
    payload
  };
}