module.exports = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Require console.warn() or console.warn() inside catch blocks",
      category: "Best Practices",
      recommended: false,
    },
    schema: [], // no options
  },
  create: function (context) {
    return {
      CatchClause(node) {
        let hasConsoleError = false;

        node.body.body.forEach((statement) => {
          if (
            statement.type === "ExpressionStatement" &&
            statement.expression.type === "CallExpression" &&
            statement.expression.callee.type === "MemberExpression" &&
            statement.expression.callee.object.name === "console" &&
            statement.expression.callee.property.name === "error"
          ) {
            hasConsoleError = true;
          }
        });

        if (!hasConsoleError) {
          context.report({
            node,
            message:
              "catch block should contain console.error() or console.warn()",
          });
        }
      },
    };
  },
};
