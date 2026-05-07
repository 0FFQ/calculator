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
      const tokens = this.tokenize(this.expression);
      const postfix = this.toPostfix(tokens);
      const result = this.evaluatePostfix(postfix);

      this.expression = result.toString();
      return this.expression;

    } catch (e) {
      this.expression = "";
      return null;
    }
  }

  tokenize(expr) {
    const tokens = [];
    let number = "";

    for (let char of expr) {
      if ("0123456789.".includes(char)) {
        number += char;
      } else {
        if (number) {
          tokens.push(parseFloat(number));
          number = "";
        }
        tokens.push(char);
      }
    }

    if (number) tokens.push(parseFloat(number));

    return tokens;
  }

  priority(op) {
    if (op === "+" || op === "-") return 1;
    if (op === "*" || op === "/") return 2;
    return 0;
  }

  isOperator(op) {
    return ["+", "-", "*", "/"].includes(op);
  }

  toPostfix(tokens) {
    const output = [];
    const stack = [];

    for (let token of tokens) {

      if (typeof token === "number") {
        output.push(token);
      }

      else if (this.isOperator(token)) {
        while (
          stack.length &&
          this.isOperator(stack[stack.length - 1]) &&
          this.priority(stack[stack.length - 1]) >= this.priority(token)
        ) {
          output.push(stack.pop());
        }
        stack.push(token);
      }

      else if (token === "(") {
        stack.push(token);
      }

      else if (token === ")") {
        while (stack.length && stack[stack.length - 1] !== "(") {
          output.push(stack.pop());
        }
        stack.pop(); // remove "("
      }
    }

    while (stack.length) {
      output.push(stack.pop());
    }

    return output;
  }

  evaluatePostfix(tokens) {
    const stack = [];

    for (let token of tokens) {

      if (typeof token === "number") {
        stack.push(token);
      }

      else {
        const b = stack.pop();
        const a = stack.pop();

        let result;

        switch (token) {
          case "+":
            result = a + b;
            break;
          case "-":
            result = a - b;
            break;
          case "*":
            result = a * b;
            break;
          case "/":
            result = a / b;
            break;
        }

        stack.push(result);
      }
    }

    return stack[0];
  }
}