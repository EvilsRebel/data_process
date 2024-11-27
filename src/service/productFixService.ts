import { readFile, writeFile } from "@tauri-apps/plugin-fs";
import { read, utils, write } from "xlsx";
import { Product } from "@/entities/product";

const columnOrder = [
  "挂网状态",
  "医用耗材代码",
  "产品名称",
  "规格",
  "型号",
  "材质",
  "包材",
  "注册证编号",
  "注册证名称",
  "库存数量",
  "企业报价/报价单位",
  "生产企业",
  "申报企业",
  "更新时间",
  "更新内容",
  "采购平台产品ID",
  "是否撤销申报",
  "备注",
];

export class ProductFixService {
  constructor() {}
  static async processExcel(path: string) {
    const raw = await ProductFixService.loadData(path);
    const origins = ProductFixService.transformData(raw);
    return ProductFixService.process(origins);
  }

  protected static async loadData(path: string) {
    const workBook = read(await readFile(path));
    return utils.sheet_to_json(workBook.Sheets[workBook.SheetNames[0]]);
  }
  protected static transformData(raws: unknown[]) {
    return raws.map((item) => new Product(item as Record<string, unknown>));
  }

  protected static process(products: Product[]) {
    const r = products.reduce<Map<string, Product>>((acc, product) => {
      const result = product.fix();

      result.forEach((item) => {
        const key = `${item.id}-${item.specification}`;

        acc.set(key, item);
      });

      return acc;
    }, new Map());

    return Array.from(r.values());
  }

  static async save(items: Record<string, unknown>[], targetPath: string) {
    const wb = utils.book_new();
    const orderedData = [
      columnOrder,
      ...items.map((item) => columnOrder.map((col) => item[col])),
    ];
    // const ws = utils.json_to_sheet(items);
    const ws = utils.aoa_to_sheet(orderedData);
    utils.book_append_sheet(wb, ws);
    const buffer = write(wb, { type: "buffer", bookType: "xlsx" });
    const uint8Array = new Uint8Array(buffer);

    return writeFile(targetPath, uint8Array);
  }
}
