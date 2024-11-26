export class Product {
  name: string;

  priceAndUnit: string;

  code: string;

  model: string;

  status: string;

  hasCancelDeclaration: string;

  updateContent: string;

  updateTime: number;

  texture: string;

  registrationName: string;

  registrationCode: string;

  producer: string;

  declarant: string;

  specification: string;

  id: string;

  raw: Record<string, unknown>;

  constructor(plain: Record<string, any>) {
    this.raw = plain;

    this.name = plain["产品名称"];
    this.priceAndUnit = plain["企业报价/报价单位"];
    this.code = plain["医用耗材代码"];
    this.model = plain["型号"];
    this.status = plain["挂网状态"];
    this.hasCancelDeclaration = plain["是否撤销申报"];
    this.updateContent = plain["更新内容"];
    this.updateTime = plain["更新时间"];
    this.texture = plain["材质"];
    this.registrationName = plain["注册证名称"];
    this.registrationCode = plain["注册证编号"];
    this.producer = plain["生产企业"];
    this.declarant = plain["申报企业"];
    this.specification = plain["规格"];
    this.id = plain["采购平台产品ID"];
  }

  /** 企业报价 */
  get price() {
    try {
      return parseInt(this.priceAndUnit.split("/")[0]);
    } catch (error) {
      return -1;
    }
  }

  /** 报价单位 */
  get unit() {
    return this.priceAndUnit.split("/")[1];
  }

  fix() {
    const specs = this.specification.split(",").filter(Boolean);

    if (specs.length === 1) {
      return this;
    }

    return specs.map((spec) => new Product({ ...this.raw, 规格: spec }));
  }
}
