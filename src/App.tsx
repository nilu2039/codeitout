import React, { useState } from "react";
import Editor from "./components/Editor";
import Test from "./components/Test";
import "bootstrap/dist/css/bootstrap.min.css";
const App: React.FC = () => {
  let code: any = localStorage.getItem("code")?.toString();
  const [value, setValue] = useState<string>(code);
  return (
    <>
      <Editor value={value} onChange={setValue} />
    </>
  );
};

export default App;
