import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { Button, Table } from "antd";

import { open } from "@tauri-apps/plugin-dialog";
import "./App.css";
import { ProductFixService } from "./service/productFixService";
import { Product } from "./entities/product";

function App() {
  const [items, setItems] = useState<Product[]>([]);
  const handleTest = async () => {
    const file = await open({
      multiple: false,
      directory: false,
      filters: [{ extensions: ["xlsx"], name: "" }],
    });

    if (!file) {
      return;
    }

    setItems(await ProductFixService.processExcel(file));
  };

  const columns = [
    { dataIndex: "name", title: "产品名称" },
    { dataIndex: "priceAndUnit", title: "企业报价/报价单位" },
    { dataIndex: "code", title: "医用耗材代码" },
    { dataIndex: "model", title: "型号" },
    { dataIndex: "status", title: "挂网状态" },
    { dataIndex: "hasCancelDeclaration", title: "是否撤销申报" },
    { dataIndex: "updateContent", title: "更新内容" },
    { dataIndex: "updateTime", title: "更新时间" },
    { dataIndex: "texture", title: "材质" },
    { dataIndex: "registrationName", title: "注册证名称" },
    { dataIndex: "registrationCode", title: "注册证编号" },
    { dataIndex: "producer", title: "生产企业" },
    { dataIndex: "declarant", title: "申报企业" },
    { dataIndex: "specification", title: "规格" },
    { dataIndex: "id", title: "采购平台产品ID" },
  ];

  return (
    <main className="container">
      <Button type="primary" onClick={handleTest}>
        测试
      </Button>
      <br />
      <Table
        columns={columns}
        dataSource={items}
        pagination={{ defaultPageSize: 20 }}
      />
    </main>
  );
}

export default App;
