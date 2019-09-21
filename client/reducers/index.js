import { combineReducers } from 'redux';

// import all reducers here
import itemsReducer from './itemsReducer';

// combine reducers
const reducers = combineReducers({
  items: itemsReducer,
});

// make the combined reducers available for import
export default reducers;
