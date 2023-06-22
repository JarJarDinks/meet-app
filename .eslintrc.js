module.exports = {
  plugins: ['prettier'],
  extends: ['airbnb', 'prettier'],
  rules: {
    // // Enforce consistent spacing before and after commas
    // 'comma-spacing': ['error', { before: false, after: true }],
    // // Enforce consistent use of curly braces in all control statements
    // 'curly': ['error', 'all'],
    // // Require default cases in switch statements
    // 'default-case': 'error',
    // // Enforce consistent dot notation whenever possible
    // 'dot-notation': 'error',
    // // Enforce consistent linebreaks before and after operators
    // 'operator-linebreak': ['error', 'after'],
    // // Disallow reassignment of function parameters
    // 'no-param-reassign': ['error', { props: true }],
    // // Disallow use of `alert`, `confirm`, and `prompt`
    // 'no-alert': 'error',
    // // Disallow use of `console` (useful in production)
    // 'no-console': 'error',
    // // Disallow leading/trailing space characters in regular expressions
    // 'no-regex-spaces': 'error',
    // // Disallow unused variables
    // 'no-unused-vars': ['error', { vars: 'all', args: 'none' }],
    // // Require object keys to be sorted alphabetically
    // 'vars-on-top': 'error',
    // // Enforce the use of === and !==
    // 'eqeqeq': 'error',
    // // Disallow the use of eval()
    // 'no-eval': 'error',
    // // Disallow the use of with statements
    // 'no-with': 'error',
    // // Enforce consistent spacing inside object braces
    // 'object-curly-spacing': ['error', 'always'],
    // // Disallow multiple spaces
    // 'no-multi-spaces': 'error',
    // // Enforce consistent indentation
    // 'indent': ['error', 2],
    // // Enforce consistent quotes
    // 'quotes': ['error', 'single'],
    // // Enforce trailing commas in multiline object and array literals
    // 'comma-dangle': ['error', 'always-multiline'],
    // // Require JSDoc comments for functions and classes
    // 'require-jsdoc': 'error',
    // // Allows jsx syntax in .js files
    // 'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
};
