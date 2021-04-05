import { useState } from "react";
import "./MenuBar.css";
import {
  Drawer,
  FormControl,
  List,
  ListItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  IconButton,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { useStateValue } from "../ContextApi/UserContext";
import { actionTypes } from "../ContextApi/reducer.js";
const MenuBar = () => {
  const [isOpen, setIsopen] = useState(false);
  const ToggleOpen = () => {
    setIsopen(!isOpen);
  };

  const [{ codemirrorlang }, dispatch] = useStateValue();
  const [selectedLang, setSelectedLang] = useState("Select a language");
  const optionSelector = (val: string) => {
    setTimeout(() => {
      setIsopen(!isOpen);
    }, 200);
    switch (val) {
      case "c":
        setSelectedLang("c");
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
        setSelectedLang("c++");
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
        setSelectedLang("c#");
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
        setSelectedLang("Java");
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
        setSelectedLang("Python");
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
        setSelectedLang("Typescript");
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
    localStorage.setItem("lang", codemirrorlang);
  };

  const arr = ["c", "c++", "c#", "Java", "Python", "Typescript"];
  return (
    <div>
      <div className="drawer">
        <button
          className="O_C_btn"
          onClick={ToggleOpen}
          style={{
            margin: "100px",
            padding: "10px 20px",
            border: "3px solid gray",
            backgroundColor: "lightgray",
            color: "black",
            borderRadius: "10px",
          }}
        >
          {selectedLang}
        </button>
        <Drawer open={isOpen} anchor="right">
          <IconButton onClick={ToggleOpen}>
            <CloseIcon style={{ color: "black" }} />
          </IconButton>
          <Divider />
          <List>
            <ListItem>
              <FormControl component="fieldset">
                <RadioGroup aria-label="gender" name="gender1">
                  {arr.map((val) => (
                    <FormControlLabel
                      style={{
                        backgroundColor: "lightgray",
                        color: "black",
                        padding: "5px 15px",
                        borderRadius: "10px",
                        border: "3px solid gray",
                        marginLeft: "18px",
                      }}
                      value={val}
                      control={<Radio />}
                      label={val}
                      key={val}
                      onClick={() => optionSelector(val)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </ListItem>
          </List>
        </Drawer>
      </div>
    </div>
  );
};

export default MenuBar;
