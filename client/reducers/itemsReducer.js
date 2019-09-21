import { ADD_ITEM } from '../actions/actions'

const initialState = {
  items: [],
};

const itemsReducer = (state=initialState, action) => {

switch(action.type) {
  case ADD_ITEM :
  return {
    ...state,
    token: action.payload
  }
  default:
    return state;
}

};

export default itemsReducer;
