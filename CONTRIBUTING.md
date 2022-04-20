# Contributing to Dream API

First off, thank you for considering contributing to Dream API! 🎉

## Code of Conduct

This project and everyone participating in it is governed by respect and professionalism. Please be kind and courteous.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Environment details** (OS, Node version, etc.)
- **Error logs** if applicable

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful**
- **List any alternatives** you've considered

### Pull Requests

1. **Fork the repo** and create your branch from `main`
2. **Follow the code style** (ESLint + Prettier are configured)
3. **Write meaningful commits** using conventional commits:
   ```
   feat: add new feature
   fix: resolve bug
   docs: update documentation
   style: format code
   refactor: restructure code
   test: add tests
   chore: update dependencies
   ```
4. **Add tests** for new features
5. **Update documentation** if needed
6. **Ensure all tests pass**: `npm run test`
7. **Lint your code**: `npm run lint`

## Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/dream-api.git
cd dream-api

# Install dependencies
npm install

# Setup environment
cp .env.example .env

# Start development
npm run start:dev
```

## Code Style

- Use **TypeScript strict mode**
- Follow **NestJS conventions**
- Use **meaningful variable names**
- Add **JSDoc comments** for public APIs
- Keep functions **small and focused**
- Write **self-documenting code**

## Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding tests
- `build`: Build system changes
- `ci`: CI configuration changes
- `chore`: Other changes (dependencies, etc.)

Examples:

```
feat(auth): add password reset functionality
fix(user): resolve email validation bug
docs(readme): update installation instructions
```

## Testing

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e
```

## Project Structure

Follow the existing structure:

```
src/
├── common/          # Shared utilities
├── modules/         # Feature modules
│   └── [entity]/
│       ├── dto/     # Data Transfer Objects
│       ├── [entity].controller.ts
│       ├── [entity].service.ts
│       └── [entity].module.ts
└── main.ts
```

## Database Changes

When making database changes:

1. Update `prisma/schema.prisma`
2. Create migration: `npm run prisma:migrate`
3. Test migration on clean database
4. Update seed file if needed

## Documentation

Update relevant documentation:

- `README.md` - Main documentation
- `API.md` - API endpoints
- `DEPLOYMENT.md` - Deployment instructions
- Code comments - JSDoc for public APIs
- Swagger decorators - API documentation

## Questions?

Feel free to open an issue with your question!

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
