import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Editor.css";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/theme/material-palenight.css";
import "codemirror/theme/monokai.css";
import "codemirror/mode/python/python";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/clike/clike";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/matchbrackets";
import { useStateValue } from "../ContextApi/UserContext";
import "react-toastify/dist/ReactToastify.css";
import { actionTypes } from "../ContextApi/reducer.js";
import { useWindowWidth } from "@react-hook/window-size/throttled";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { Input, Spinner } from "reactstrap";
import { Controlled as ControlledEditor } from "react-codemirror2";
import { toast } from "react-toastify";
import MenuBar from "./MenuBar";
import optionSelector from "./utils/optionSelector";
interface Props {
  value: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}
const Editor: React.FC<Props> = ({ value, onChange }) => {
  const [{ lang, codemirrorlang }, dispatch] = useStateValue();
  const [stdin, setStdin] = useState<string>("");
  const [output, setOutput] = useState();
  const [loading, setLoading] = useState<boolean>(false);
  const [width, setWidth] = useState<number>();
  const lanArray = ["c", "c++", "c#", "Java", "Python", "Typescript"];
  const handleChange = (editor: any, data: any, value: string) => {
    onChange(value);
    localStorage.setItem("code", value);
  };

  const url: string = process.env.REACT_APP_URL!;
  const code = value;

  const w: number = useWindowWidth();
  useEffect(() => {
    setWidth(w);
  }, [w]);
  const fetchData = async () => {
    if (lang) {
      setLoading(true);
      const { data } = await axios.post(url, {
        language: lang,
        source: code,
        stdin: stdin,
      });
      setLoading(false);
      setOutput(data.output);
    } else
      return toast("Choose a language", {
        type: "error",
        position: "top-left",
      });
  };

  return (
    <div className="editor-container">
      <div className="selector_editor">
        <div
          className="code__editor"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <ControlledEditor
            onBeforeChange={handleChange}
            value={value}
            options={{
              lineWrapping: true,
              lint: true,
              autoCloseBrackets: true,
              mode: codemirrorlang,
              theme: "material-palenight",
              lineNumbers: true,
              indentWithTabs: true,
              indentUnit: 4,
              extraKeys: { "Ctrl-Space": "autocomplete" },
              matchBrackets: true,
            }}
          />
        </div>
        <div className="language_selecter_button">
          {width! >= 1160 ? (
            <FormControl component="fieldset">
              <RadioGroup
                aria-label="gender"
                name="gender1"
                className="mobile_responsive"
              >
                {lanArray.map((val) => (
                  <FormControlLabel
                    style={{
                      backgroundColor: "lightgray",
                      color: "black",
                      padding: "5px 15px",
                      borderRadius: "10px",
                      border: "3px solid gray",
                    }}
                    className="mobile_responsive_btn"
                    value={val}
                    control={<Radio />}
                    label={val}
                    key={val}
                    onClick={() => optionSelector(val, dispatch, actionTypes)}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          ) : (
            <MenuBar />
          )}
        </div>
      </div>

      <div className="InputGroup">
        <h3>Input</h3>
        <Input
          className="input"
          type="textarea"
          name="text"
          value={stdin}
          onChange={(e) => setStdin(e.target.value)}
        />
        <button onClick={fetchData}>RUN</button>
        {loading && <Spinner color="dark" />}
      </div>
      <div style={{ display: "grid", placeItems: "center" }}>
        <div className="output">
          <h1>{output}</h1>
        </div>
      </div>
    </div>
  );
};

export default Editor;
