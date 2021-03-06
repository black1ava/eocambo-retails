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

export function addToCart({ productId, amount, variations_id }){
  return {
    type: 'ADD_TO_CART',
    productId,
    amount,
    variations_id
  };
}

export function updateToCart({ id, amount }){
  return {
    type: 'UPDATE_TO_CART',
    id,
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

export function setTotal(payload){
  return {
    type: 'SET_TOTAL',
    payload
  }
}

export function orderProductsInCart(){
  return {
    type: 'ORDER_PRODUCTS_IN_CART'
  }
}

export function setCompanyInfo(payload){
  return {
    type: 'SET_COMPANY_INFO',
    payload
  };
}

export function setPromotions(payload){
  return {
    type: 'SET_PROMOTIONS',
    payload
  }
}

export function updateProfile(payload){
  return {
    type: 'UPDATE_PROFILE',
    payload
  }
}

export function setLoginAttempt(){
  return { type: 'SET_LOGIN_ATTEMPT' };
}

export function changeLanguage(payload){
  return {
    type: 'CHANGE_LANGUAGE',
    payload
  };
}

export function setOrderType(payload){
  return {
    type: 'SET_ORDER_TYPE',
    payload
  }
}

export function setSlides(payload){
  return {
    type: 'SET_SLIDES',
    payload
  };
}