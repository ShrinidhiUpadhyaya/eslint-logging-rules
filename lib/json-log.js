module.exports = {
  meta: {
    type: "suggestion", // this rule is a suggestion
    docs: {
      description: "Suggests using console.log with JSON format",
      category: "Best Practices",
      recommended: false,
    },
    fixable: "code",
    schema: [], // no options
  },
  create: function (context) {
    return {
      CallExpression(node) {
        if (
          node.callee.type === "MemberExpression" &&
          node.callee.object.name === "console" &&
          node.callee.property.name === "log" &&
          node.arguments.length === 1 &&
          node.arguments[0].type === "Literal"
        ) {
          context.report({
            node,
            message:
              'Use console.log({ message: "Hello World" }) instead of console.log("Hello World")',
            fix: function (fixer) {
              return fixer.replaceText(
                node,
                'console.log({ message: "Hello World" })'
              );
            },
          });
        }
      },
    };
  },
};
