import React, { useState } from "react";
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
import { actionTypes } from "../ContextApi/reducer.js";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@material-ui/core";
import { Input, Spinner } from "reactstrap";
import { Controlled as ControlledEditor } from "react-codemirror2";
interface Props {
  value: string;
  onChange: any;
}
const Editor: React.FC<Props> = ({ value, onChange }) => {
  const [{ cachedcode }, dispatch] = useStateValue();
  const [stdin, setStdin] = useState<string>("");
  const [output, setOutput] = useState();
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<string>("");
  const [codemirrorlanguage, setCodemirrorLanguage] = useState<string>(
    "text/x-csrc"
  );
  const lanArray = ["c", "c++", "c#", "Java", "Python", "Typescript"];
  const handleChange = (editor: any, data: any, value: string) => {
    onChange(value);
    localStorage.setItem("code", value);
  };
  const url = "https://emkc.org/api/v1/piston/execute";
  const code = value;

  const fetchData = async () => {
    setLoading(true);
    const { data } = await axios.post(url, {
      language: language,
      source: code,
      stdin: stdin,
    });
    dispatch({
      type: actionTypes.SET_CODE,
      cachedcode: value,
    });
    setLoading(false);
    setOutput(data.output);
  };

  const optionSelector = (val: string) => {
    switch (val) {
      case "c":
        setLanguage("c");
        setCodemirrorLanguage("text/x-csrc");
        break;
      case "c++":
        setLanguage("cpp");
        setCodemirrorLanguage("text/x-c++src");
        break;
      case "c#":
        setLanguage("csharp");
        setCodemirrorLanguage("text/x-csharp");
        break;
      case "Java":
        setLanguage("java");
        setCodemirrorLanguage("text/x-java");
        break;
      case "Python":
        setLanguage("python3");
        setCodemirrorLanguage("text/x-python");
        break;
      case "Typescript":
        setLanguage("typescript");
        setCodemirrorLanguage("text/typescript");
        break;
      default:
        break;
    }
  };

  return (
    <div className="editor-container">
      <div className="selector_editor">
        <div className="code__editor">
          <ControlledEditor
            onBeforeChange={handleChange}
            value={value}
            options={{
              lineWrapping: true,
              lint: true,
              autoCloseBrackets: true,
              mode: codemirrorlanguage,
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
          <FormControl component="fieldset">
            <RadioGroup aria-label="gender" name="gender1">
              {lanArray.map((val) => (
                <FormControlLabel
                  style={{
                    backgroundColor: "lightgray",
                    color: "black",
                    padding: "5px 15px",
                    borderRadius: "10px",
                    border: "2px solid gray",
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
