import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers/index';
import { loadState, saveState } from './localStorage';

const persistedState = loadState();

const store = createStore(
  reducers,
  persistedState,
  composeWithDevTools()
);

store.subscribe(() => {
  saveState({
    // item: store.getState().items,
  });
});

export default store;
