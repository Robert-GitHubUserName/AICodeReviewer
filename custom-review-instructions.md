# Company-Specific Code Review Guidelines

## Security Requirements

### Authentication & Authorization

- All endpoints must implement proper authentication
- Use JWT tokens with appropriate expiration times
- Implement role-based access control (RBAC)
- Validate all user inputs to prevent injection attacks
- Use HTTPS for all external communications

### Data Protection

- Encrypt sensitive data at rest and in transit
- Implement proper password hashing (bcrypt, scrypt)
- Use parameterized queries to prevent SQL injection
- Implement rate limiting on authentication endpoints
- Log security events for audit purposes

## Code Quality Standards

### Naming Conventions

- Use camelCase for variables and functions
- Use PascalCase for classes and components
- Use UPPER_SNAKE_CASE for constants
- Use kebab-case for file names
- Use descriptive, meaningful names

### Error Handling

- Implement proper try-catch blocks
- Provide meaningful error messages to users
- Log errors with appropriate levels
- Don't expose sensitive information in error messages
- Implement graceful degradation

### Performance Guidelines

- Optimize database queries
- Implement caching where appropriate
- Minimize bundle sizes
- Use lazy loading for large components
- Monitor memory usage

## Architecture & Design

### API Design

- Follow RESTful conventions
- Use proper HTTP status codes
- Implement pagination for list endpoints
- Version your APIs
- Document all endpoints with OpenAPI/Swagger

### Database Design

- Use proper indexing strategies
- Implement database migrations
- Avoid N+1 query problems
- Use transactions for related operations
- Implement proper foreign key relationships

## Testing Requirements

### Unit Tests

- Write tests for all business logic
- Aim for 80% code coverage minimum
- Test both positive and negative scenarios
- Mock external dependencies
- Test edge cases

### Integration Tests

- Test API endpoints
- Test database operations
- Test third-party integrations
- Use realistic test data
- Clean up test data

## Documentation

### Code Comments

- Document complex business logic
- Explain non-obvious decisions
- Update comments when code changes
- Use JSDoc for functions
- Document API parameters and responses

### Pull Request Guidelines

- Write clear, descriptive PR titles
- Include testing instructions
- Reference related issues
- Update documentation as needed
- Ensure CI/CD passes

## Compliance & Legal

### Data Privacy

- Implement GDPR compliance measures
- Handle user data appropriately
- Provide data export/deletion options
- Document data retention policies

### Accessibility

- Ensure WCAG 2.1 AA compliance
- Test with screen readers
- Provide keyboard navigation
- Use proper color contrast ratios
- Support different screen sizes

## Development Best Practices

### Git Workflow

- Use feature branches
- Write meaningful commit messages
- Keep PRs small and focused
- Review code thoroughly
- Use conventional commit format

### Code Reviews

- Focus on code quality, not personal preferences
- Be constructive and respectful
- Suggest improvements, don't demand changes
- Consider security implications
- Think about maintainability and scalability
