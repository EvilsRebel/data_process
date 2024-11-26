import { readFile } from "@tauri-apps/plugin-fs";
import { read, utils } from "xlsx";
import { isArray } from "lodash-es";
import { Product } from "@/entities/product";

export class ProductFixService {
  /**
   *
   */
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
    const r = products.reduce<Product[]>((acc, product) => {
      const result = product.fix();

      if (isArray(result)) {
        acc.push(...result);
      } else {
        acc.push(result);
      }
      return acc;
    }, []);
    console.log("qwqw", r);

    return r;
  }
}
