export class Calculator {
  constructor() {
    this.expression = "";
  }

  add(value) {
    this.expression += value;
  }

  clear() {
    this.expression = "";
  }

  getDisplay() {
    return this.expression || "0";
  }

  calculate() {
    try {
      const result = eval(this.expression);

      this.expression = result.toString();

      return this.expression;
    } catch (e) {
      this.expression = "";
      return null;
    }
  }
}