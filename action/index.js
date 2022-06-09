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