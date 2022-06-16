export function addProducts(payload){
  return {
    type: 'ADD_PRODUCTS',
    payload
  };
}

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

export function increaseProductInCart(payload){
  return {
    type: 'INCREASE_PRODUCT_IN_CART',
    payload
  };
};

export function decreaseProductInCart(payload){
  return {
    type: 'DECREASE_PRODUCT_IN_CART',
    payload
  };
};

export function setUser(payload){
  return {
    type: 'SET_USER',
    payload
  };
}