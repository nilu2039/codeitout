export const initialState = {
  cachedcode: "",
};

export const actionTypes = {
  SET_CODE: "SET_CODE",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_CODE:
      return {
        ...state,
        cachedcode: action.cachedcode,
      };
    default:
      return state;
  }
};

export default reducer;
