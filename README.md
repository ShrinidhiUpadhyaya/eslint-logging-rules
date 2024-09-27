# Custom ESLint Rules Plugin

A custom ESLint plugin providing rules to enforce best practices for error handling, logging, and consistent code structure in JavaScript/Node.js projects.

<h2>Features</h2>
This plugin includes the following custom rules:

- **`catch-rule`**: Ensures all Promises have a proper `.catch` block to handle errors.
- **`custom-fields-rule`**: Enforces the inclusion of custom fields (timestamp, application, system, severity, reason, category) in logs.
- **`json-log-rule`**: Validates that logs are in a consistent JSON format for easier parsing by log management tools.
- **`return-rule`**: Ensures functions explicitly return a value.
- **`then-rule`**: Enforces consistent structure for `.then` chains in Promises, preventing deeply nested chains and ensuring correct returns.

<h2>Installation</h2>
You can install the plugin via npm:


```bash
npm install eslint-logging-rules --save-dev
```

<h2>Usage</h2>
To enable the plugin and its rules in your project:
1. Import the plugin in eslint.config.mjs


```bash
import eslintPluginCustomRules from "eslint-logging-rules"; // Import your custom rules plugin
```

2. Enable the rules you want to enforce in the rules section:

```bash
 {
    plugins: {
      customRules: eslintPluginCustomRules,
    },
    rules: {
      "customRules/return-rule": "warn",
      "customRules/json-log-rule": "warn",
      "customRules/custom-fields-rule": "warn",
      "customRules/catch-rule": "warn",
      "customRules/then-rule": "warn",
    },
  },
```

<h2>Acknowledgements</h2>
This package was created to promote clean, consistent coding practices, particularly around error handling and logging in JavaScript applications.

