import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import { readFile } from "@tauri-apps/plugin-fs";
import { read, utils } from "xlsx";
import { Button } from "antd";

import { open } from "@tauri-apps/plugin-dialog";
import "./App.css";
import { ProductFixService } from "./service/productFixService";

function App() {
  const handleTest = async () => {
    const file = await open({
      multiple: false,
      directory: false,
      filters: [{ extensions: ["xlsx"], name: "" }],
    });

    if (!file) {
      return;
    }

    ProductFixService.processExcel(file);
  };
  return (
    <main className="container">
      <Button onClick={handleTest}>测试</Button>
    </main>
  );
}

export default App;
