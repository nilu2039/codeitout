import React, { useState } from "react";
import axios from "axios";
import "./Editor.css";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
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
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Spinner,
  UncontrolledDropdown,
} from "reactstrap";
import { Controlled as ControlledEditor } from "react-codemirror2";
interface Props {
  value: string;
  onChange: any;
}
const Editor: React.FC<Props> = ({ value, onChange }) => {
  const [{ cachedcode }, dispatch] = useStateValue();
  const [stdin, setStdin] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("c");
  const [output, setOutput] = useState();
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState<string>("");
  const [codemirrorlanguage, setCodemirrorLanguage] = useState<string>(
    "text/x-csrc"
  );
  const handleChange = (editor: any, data: any, value: string) => {
    onChange(value);
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
    localStorage.setItem("code", code);
    dispatch({
      type: actionTypes.SET_CODE,
      cachedcode: value,
    });
    setLoading(false);
    setOutput(data.output);
  };

  const optionSelector = (val: string) => {
    setSelectedOption(val);
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
      <div className="language_selecter_button">
        <UncontrolledDropdown className="menu">
          <div>
            <DropdownToggle
              className="dropdownToggle"
              caret
              color="warning"
              id="navbarDropdownMenuLink2"
              type="button"
            >
              {selectedOption}
            </DropdownToggle>

            <DropdownMenu
              aria-labelledby="navbarDropdownMenuLink2"
              className="dropdown_scroll"
            >
              <li className="dropdown">
                <DropdownItem onClick={() => optionSelector("c")}>
                  c
                </DropdownItem>
              </li>
              <li className="dropdown">
                <DropdownItem onClick={() => optionSelector("c++")}>
                  c++
                </DropdownItem>
              </li>
              <li className="dropdown">
                <DropdownItem onClick={() => optionSelector("c#")}>
                  c#
                </DropdownItem>
              </li>
              <li className="dropdown">
                <DropdownItem onClick={() => optionSelector("Java")}>
                  Java
                </DropdownItem>
              </li>
              <li className="dropdown">
                <DropdownItem onClick={() => optionSelector("Python")}>
                  Python
                </DropdownItem>
              </li>
              <li className="dropdown">
                <DropdownItem onClick={() => optionSelector("Typescript")}>
                  Typescript
                </DropdownItem>
              </li>
            </DropdownMenu>
          </div>
        </UncontrolledDropdown>
      </div>
      <ControlledEditor
        onBeforeChange={handleChange}
        value={value}
        options={{
          lineWrapping: true,
          lint: true,
          autoCloseBrackets: true,
          mode: codemirrorlanguage,
          theme: "material",
          lineNumbers: true,
          indentWithTabs: true,
          indentUnit: 4,
          extraKeys: { "Ctrl-Space": "autocomplete" },
          matchBrackets: true,
        }}
      />
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
      <div className="output">
        <h1>{output}</h1>
      </div>
    </div>
  );
};

export default Editor;
