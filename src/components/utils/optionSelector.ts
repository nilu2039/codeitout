
  const optionSelector = (val: string, dispatch: any, actionTypes: any) => {
    switch (val) {
      case "c":
        dispatch({
          type: actionTypes.SET_CODEMIRRORLANGUAGE,
          codemirrorlang: "text/x-csrc",
        });
        dispatch({
          type: actionTypes.SET_LANGUAGE,
          lang: "c",
        });
        break;
      case "c++":
        dispatch({
          type: actionTypes.SET_LANGUAGE,
          lang: "cpp",
        });
        dispatch({
          type: actionTypes.SET_CODEMIRRORLANGUAGE,
          codemirrorlang: "text/x-c++src",
        });
        break;
      case "c#":
        dispatch({
          type: actionTypes.SET_LANGUAGE,
          lang: "csharp",
        });
        dispatch({
          type: actionTypes.SET_CODEMIRRORLANGUAGE,
          codemirrorlang: "text/x-csharp",
        });
        break;
      case "Java":
        dispatch({
          type: actionTypes.SET_LANGUAGE,
          lang: "java",
        });
        dispatch({
          type: actionTypes.SET_CODEMIRRORLANGUAGE,
          codemirrorlang: "text/x-java",
        });
        break;
      case "Python":
        dispatch({
          type: actionTypes.SET_LANGUAGE,
          lang: "python3",
        });
        dispatch({
          type: actionTypes.SET_CODEMIRRORLANGUAGE,
          codemirrorlang: "text/x-python",
        });
        break;
      case "Typescript":
        dispatch({
          type: actionTypes.SET_LANGUAGE,
          lang: "typescript",
        });
        dispatch({
          type: actionTypes.SET_CODEMIRRORLANGUAGE,
          codemirrorlang: "text/typescript",
        });
        break;
      default:
        break;
    }
  };

  export default optionSelector;