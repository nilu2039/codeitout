import React, { useState } from "react";
import Editor from "./components/Editor";
import "bootstrap/dist/css/bootstrap.min.css";
const App: React.FC = () => {
  let code: any = localStorage.getItem("code")?.toString();
  const [value, setValue] = useState<string>(code);
  return (
    <div>
      <Editor value={value} onChange={setValue} />
    </div>
  );
};

export default App;
