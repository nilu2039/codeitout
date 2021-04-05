export const initialState = {
  lang: "",
  codemirrorlang: localStorage.getItem("lang"),
  selectedLang: "",
};

export const actionTypes = {
  SET_LANGUAGE: "SET_LANGUAGE",
  SET_CODEMIRRORLANGUAGE: "SET_CODEMIRRORLANGUAGE",
  SET_SELECTEDLANG: "SET_SELECTEDLANG",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_LANGUAGE:
      return {
        ...state,
        lang: action.lang,
      };
    case actionTypes.SET_CODEMIRRORLANGUAGE:
      return {
        ...state,
        codemirrorlang: action.codemirrorlang,
      };
    case actionTypes.SET_SELECTEDLANG:
      return {
        ...state,
        selectedLang: action.selectedLang,
      };
    default:
      return state;
  }
};

export default reducer;
