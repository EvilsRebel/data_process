import { useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { message, Row, Button, Table } from "antd";

import { open, save } from "@tauri-apps/plugin-dialog";
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

  const handleSave = async () => {
    const path = await save({
      defaultPath: "product.xlsx",
    });
    if (!path) {
      return;
    }
    await ProductFixService.save(
      items.map((item) => item.raw),
      path,
    );
    message.success("保存成功");
  };

  const columns = [
    { dataIndex: "name", title: "产品名称", width: 300 },
    { dataIndex: "priceAndUnit", title: "企业报价/报价单位" },
    { dataIndex: "code", title: "医用耗材代码", width: 250 },
    { dataIndex: "model", title: "型号", width: 150 },
    { dataIndex: "status", title: "挂网状态", width: 100 },
    { dataIndex: "hasCancelDeclaration", title: "是否撤销申报", width: 120 },
    { dataIndex: "updateContent", title: "更新内容" },
    { dataIndex: "updateTime", title: "更新时间" },
    { dataIndex: "texture", title: "材质", width: 150 },
    { dataIndex: "registrationName", title: "注册证名称", width: 300 },
    { dataIndex: "registrationCode", title: "注册证编号", width: 300 },
    { dataIndex: "producer", title: "生产企业", width: 250 },
    { dataIndex: "declarant", title: "申报企业", width: 250 },
    { dataIndex: "specification", title: "规格", width: 150 },
    { dataIndex: "id", title: "采购平台产品ID", width: 200 },
  ];

  return (
    <main className="container">
      <Row>
        <Button onClick={handleTest}>导入</Button>
        <Button type="primary" onClick={handleSave}>
          保存
        </Button>
      </Row>

      <br />
      <Table
        scroll={{ x: 3000 }}
        id="qw"
        sticky
        rowKey={(record) => `${record.id}-${record.specification}`}
        columns={columns}
        dataSource={items}
        pagination={{ defaultPageSize: 20 }}
      />
    </main>
  );
}

export default App;
