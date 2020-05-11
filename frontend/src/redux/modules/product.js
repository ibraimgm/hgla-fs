const NAME_CHANGED = 'NAME_CHANGED';

export const setName = (name) => ({ type: NAME_CHANGED, payload: name });

export const getName = (state) => state.product.name || 'No name';

export default (state = {}, action) => {
  switch (action.type) {
    case NAME_CHANGED:
      return { ...state, name: action.payload };
    default:
      return state;
  }
};
