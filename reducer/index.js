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

    default:
      return state;
  }
}