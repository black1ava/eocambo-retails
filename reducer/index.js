let initialState= {
  menusActive:{
    home: false,
    favorite: false
  }
}

export default function reducer(state = initialState, action){
  switch(action.type){
    case 'TOGGLE_HOME_MENU_ACTIVE':
      return {
        ...state,
        menusActive: {
          ...state.menusActive,
          home: true
        }
      }

    case 'TOGGLE_FAVORITE_MENU_ACTIVE':
      return {
        ...state,
        menusActive: {
          ...state.menusActive,
          favorite: true
        }
      }

    case 'INACTIVATE_ALL_MENUS':
      return {
        state: initialState
      }

    default:
      return state;
  }
}