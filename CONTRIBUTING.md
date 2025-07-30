# Contributing to GitHub Profile README Generator

Thank you for considering contributing to the GitHub Profile README Generator! This document outlines the guidelines for contributing to this project.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please read it before contributing.

- Be respectful and inclusive
- Be patient and welcoming
- Be thoughtful
- Be collaborative
- When disagreeing, try to understand why

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find that the bug has already been reported. When you are creating a bug report, please include as many details as possible:

- Use a clear and descriptive title
- Describe the exact steps to reproduce the problem
- Provide specific examples to demonstrate the steps
- Describe the behavior you observed after following the steps
- Explain which behavior you expected to see instead and why
- Include screenshots if possible
- Include your environment details (OS, browser, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

- Use a clear and descriptive title
- Provide a step-by-step description of the suggested enhancement
- Provide specific examples to demonstrate the steps
- Describe the current behavior and explain which behavior you expected to see instead
- Explain why this enhancement would be useful to most users
- List some other applications where this enhancement exists, if applicable

### Pull Requests

- Fill in the required template
- Do not include issue numbers in the PR title
- Follow the style guide
- Include screenshots in your pull request whenever possible
- End all files with a newline
- Avoid platform-dependent code

## Style Guides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

### JavaScript Style Guide

- All JavaScript code is linted with ESLint and formatted with Prettier
- Prefer the object spread operator (`{...anotherObj}`) to `Object.assign()`
- Inline `export`s with expressions whenever possible
  ```js
  // Use this:
  export const foo = 'bar';

  // Instead of:
  const foo = 'bar';
  export { foo };
  ```
- Place imports in the following order:
  - External packages
  - Internal modules
  - Stylesheets

### CSS Style Guide

- Use Tailwind CSS utility classes when possible
- For custom CSS, follow BEM naming convention
- Use CSS variables for theming and consistent values

### Documentation Style Guide

- Use Markdown for documentation
- Reference methods and classes in markdown with the custom `{@link}` syntax

## Development Workflow

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/github-profile-readme-generator.git

# Navigate to the project directory
cd github-profile-readme-generator

# Add the original repository as a remote
git remote add upstream https://github.com/original-owner/github-profile-readme-generator.git

# Install dependencies
yarn install

# Start the development server
yarn dev
```

### Testing

- Write tests for new features
- Run tests before submitting a PR
- Ensure all tests pass

```bash
# Run tests
yarn test
```

## Additional Notes

### Issue and Pull Request Labels

This project uses labels to help organize and identify issues and pull requests:

- `bug`: Something isn't working
- `documentation`: Improvements or additions to documentation
- `enhancement`: New feature or request
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention is needed
- `question`: Further information is requested

## Thank You!

Your contributions to open source, large or small, make projects like this possible. Thank you for taking the time to contribute.