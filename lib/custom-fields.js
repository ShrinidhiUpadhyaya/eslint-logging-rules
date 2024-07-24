module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Ensure console.log statements contain required fields",
      category: "Best Practices",
      recommended: false,
    },
    schema: [], // no options
  },
  create: function (context) {
    return {
      CallExpression(node) {
        if (
          node.callee.type === "MemberExpression" &&
          node.callee.object.name === "console" &&
          node.callee.property.name === "log"
        ) {
          const requiredFields = [
            "timestamp",
            "application",
            "system",
            "severity",
            "reason",
            "category",
          ];
          const argumentsNode = node.arguments[0];

          if (argumentsNode && argumentsNode.type === "ObjectExpression") {
            const properties = argumentsNode.properties.map(
              (property) => property.key.name
            );
            const missingFields = requiredFields.filter(
              (field) => !properties.includes(field)
            );

            if (missingFields.length > 0) {
              context.report({
                node,
                message: `console.log is missing required fields: ${missingFields.join(
                  ", "
                )}`,
              });
            }
          } else {
            context.report({
              node,
              message: "console.log should have an object with required fields",
            });
          }
        }
      },
    };
  },
};
