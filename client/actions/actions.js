export const ADD_ITEM = 'ADD_ITEM';

export const addNewItem = (data) => ({
  type: ADD_ITEM,
  payload: data,
});
