module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Require console.log() or console.info() inside .then() blocks",
      category: "Best Practices",
      recommended: false,
    },
    schema: [], // no options
  },
  create: function (context) {
    return {
      'CallExpression[callee.property.name="then"]'(node) {
        const thenBlock = node.arguments[0];
        if (
          thenBlock &&
          thenBlock.type === "ArrowFunctionExpression" &&
          thenBlock.body.type === "BlockStatement"
        ) {
          let hasConsoleLogOrInfo = false;

          thenBlock.body.body.forEach((statement) => {
            if (
              statement.type === "ExpressionStatement" &&
              statement.expression.type === "CallExpression" &&
              statement.expression.callee.type === "MemberExpression" &&
              statement.expression.callee.object.name === "console" &&
              (statement.expression.callee.property.name === "log" ||
                statement.expression.callee.property.name === "info")
            ) {
              hasConsoleLogOrInfo = true;
            }
          });

          if (!hasConsoleLogOrInfo) {
            context.report({
              node: thenBlock,
              message:
                "then block should contain console.log() or console.info()",
            });
          }
        }
      },
    };
  },
};
