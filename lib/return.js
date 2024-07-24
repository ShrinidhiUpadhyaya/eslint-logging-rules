module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Requires adding logging after calling a function that returns values",
      category: "Best Practices",
      recommended: false,
    },
    schema: [],
  },
  create(context) {
    function isLoggingStatement(statement) {
      return (
        statement.type === "ExpressionStatement" &&
        statement.expression.type === "CallExpression" &&
        statement.expression.callee.object &&
        statement.expression.callee.object.name === "console"
      );
    }

    function hasReturnValue(functionName) {
      const variableDeclarators = context
        .getSourceCode()
        .ast.body.filter((node) => node.type === "VariableDeclaration");
      for (const declarator of variableDeclarators) {
        if (declarator.declarations) {
          for (const declaration of declarator.declarations) {
            if (
              declaration.init &&
              declaration.init.type === "FunctionExpression"
            ) {
              if (declaration.id && declaration.id.name === functionName) {
                return declaration.init.body.body.some(
                  (statement) => statement.type === "ReturnStatement"
                );
              }
            } else if (
              declaration.init &&
              declaration.init.type === "ArrowFunctionExpression"
            ) {
              if (declaration.id && declaration.id.name === functionName) {
                return declaration.init.body.type === "BlockStatement"
                  ? declaration.init.body.body.some(
                      (statement) => statement.type === "ReturnStatement"
                    )
                  : true;
              }
            }
          }
        }
      }

      const functionDeclarations = context
        .getSourceCode()
        .ast.body.filter((node) => node.type === "FunctionDeclaration");
      for (const declaration of functionDeclarations) {
        if (declaration.id && declaration.id.name === functionName) {
          return declaration.body.body.some(
            (statement) => statement.type === "ReturnStatement"
          );
        }
      }

      return false;
    }

    return {
      CallExpression(node) {
        if (
          node.callee.type === "Identifier" &&
          hasReturnValue(node.callee.name)
        ) {
          const parent = node.parent;
          if (parent.type === "ExpressionStatement") {
            const sibling = context.getSourceCode().getTokenAfter(parent);
            if (
              !sibling ||
              sibling.type !== "Punctuator" ||
              sibling.value !== ";" ||
              !isLoggingStatement(
                parent.parent.body[parent.parent.body.indexOf(parent) + 1]
              )
            ) {
              context.report({
                node,
                message: `Consider adding logging after calling function '${node.callee.name}' which returns a value.`,
              });
            }
          }
        }
      },
    };
  },
};
