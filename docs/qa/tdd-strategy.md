# Test-Driven Development (TDD) Strategy

## Introduction

This document provides a lightweight TDD strategy for developers implementing user stories in the Local Norwegian Car Mechanic Website project. It outlines practical workflows, testing patterns, and guidelines specific to our Next.js/TypeScript/Tailwind stack.

## The TDD Workflow: Red-Green-Refactor

### 1. RED: Write a Failing Test
- Write a minimal test that defines the expected behavior
- Ensure the test fails with a clear error message
- Focus on one specific behavior at a time

### 2. GREEN: Make the Test Pass
- Write the simplest code that makes the test pass
- Don't worry about perfect implementation yet
- Focus solely on satisfying the test requirements

### 3. REFACTOR: Improve the Code
- Clean up the implementation while keeping tests passing
- Remove duplication, improve naming, optimize structure
- Ensure all tests still pass after refactoring

## Testing Framework and Tools

### Core Testing Stack
- **Jest**: Primary testing framework with TypeScript support
- **React Testing Library**: For component testing (when needed)
- **jsdom**: Test environment for DOM manipulation

### Configuration
- Tests located in `src/__tests__/` directory
- Test files follow pattern `*.test.ts` or `*.test.tsx`
- Module path mapping configured for `@/` imports

## Writing Effective Unit Tests

### Test Structure
```typescript
// Use descriptive test names that explain the behavior
test("should generate correct pagination when current page is in middle", () => {
  // Arrange: Set up test data
  const currentPage = 5;
  const totalPages = 8;
  
  // Act: Execute the function being tested
  const result = generatePagination(currentPage, totalPages);
  
  // Assert: Verify the expected outcome
  expect(result).toEqual(expectedPaginationArray);
});
```

### Test Naming Conventions
- Use "should" or "should not" to describe expected behavior
- Include the condition being tested
- Be specific about the expected outcome
- Examples:
  - `should return empty array when no posts found`
  - `should format Norwegian phone numbers correctly`
  - `should validate required form fields`

### Given-When-Then Pattern
```typescript
test("should calculate service price with Norwegian VAT", () => {
  // Given: A service with base price and Norwegian VAT rate
  const basePrice = 1000;
  const vatRate = 0.25; // 25% Norwegian VAT
  
  // When: Calculating the total price
  const totalPrice = calculateTotalPrice(basePrice, vatRate);
  
  // Then: The total should include VAT
  expect(totalPrice).toBe(1250);
});
```

## Test Coverage Guidelines

### Minimum Coverage Thresholds
- **Statements**: 80%
- **Branches**: 75%
- **Functions**: 85%
- **Lines**: 80%

### What to Test
- Business logic functions (utilities, helpers)
- Data transformation functions
- Form validation logic
- API response handlers
- Component behavior (when complex)

### What Not to Test
- Static content and markup
- Third-party library code
- CSS styles and classes
- Simple getter/setter methods

## Common Test Patterns for Our Application

### 1. Pagination Logic
```typescript
test("should generate pagination with excerpts for large page counts", () => {
  const result = generatePagination(5, 10);
  expect(result).toContainEqual({ page: null, current: false, excerpt: true });
});
```

### 2. Date Formatting (Norwegian)
```typescript
test("should format dates in Norwegian format", () => {
  const date = new Date("2025-01-15");
  const formatted = formatNorwegianDate(date);
  expect(formatted).toBe("15. januar 2025");
});
```

### 3. Price Formatting
```typescript
test("should format prices with Norwegian krone symbol", () => {
  const price = 1299.5;
  const formatted = formatPrice(price);
  expect(formatted).toBe("1.299,50 kr");
});
```

### 4. Phone Number Validation
```typescript
test("should validate Norwegian phone numbers", () => {
  expect(validateNorwegianPhone("+47 123 45 678")).toBe(true);
  expect(validateNorwegianPhone("12345678")).toBe(false);
});
```

### 5. Service Duration Calculation
```typescript
test("should calculate service duration in hours and minutes", () => {
  const duration = calculateDuration(90); // 90 minutes
  expect(duration).toEqual({ hours: 1, minutes: 30 });
});
```

## Unit Tests vs. Integration Tests

### Unit Tests
- Test individual functions/components in isolation
- Fast execution and easy debugging
- Mock external dependencies
- Focus on business logic

### Integration Tests
- Test multiple components working together
- Include real API calls (to test endpoints)
- Test user workflows across components
- More comprehensive but slower

### When to Use Integration Tests
- Critical user journeys (booking flow, contact form)
- Component interaction (form submission)
- API integration (content fetching)
- Complex state management

## Story Completion Checklist

### Before Starting Implementation
- [ ] Review acceptance criteria
- [ ] Identify testable scenarios
- [ ] Plan unit tests for business logic
- [ ] Plan integration tests for user workflows

### During Implementation
- [ ] Write failing test first (RED)
- [ ] Implement minimal code to pass (GREEN)
- [ ] Refactor while keeping tests passing (REFACTOR)
- [ ] Add edge case tests as needed

### Before Marking Story Complete
- [ ] All tests pass
- [ ] Coverage thresholds met
- [ ] Manual testing confirms functionality
- [ ] Code reviewed for test quality
- [ ] Tests document expected behavior

## Running Tests

### Commands
```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- pagination.test.ts
```

### Coverage Reports
Coverage reports are generated in `coverage/` directory.
Open `coverage/lcov-report/index.html` to view detailed coverage.

## Best Practices

### Test Organization
- Group related tests in `describe` blocks
- Use `beforeEach`/`afterEach` for setup/teardown
- Keep tests focused and independent
- Use descriptive names that explain behavior

### Test Data Management
- Use factory functions for test data
- Keep test data minimal and relevant
- Avoid hardcoded values that might change
- Use consistent data across related tests

### Performance Considerations
- Keep tests fast and focused
- Avoid unnecessary DOM operations
- Mock expensive operations (API calls, timers)
- Use appropriate test environments

## Troubleshooting

### Common Issues
1. **Import errors**: Check `jest.config.js` module mapping
2. **TypeScript errors**: Ensure `ts-jest` is configured
3. **Async test issues**: Use `async/await` with proper assertions
4. **Mock issues**: Verify mock implementations match real APIs

### Debugging Tips
- Use `console.log` in tests for debugging
- Run tests with `--verbose` flag for detailed output
- Use `test.only` to focus on specific failing tests
- Check coverage reports for untested code paths

## Conclusion

This TDD strategy provides a balanced approach to testing that ensures code quality without slowing development. By following these guidelines, developers can create maintainable, well-tested code that meets the quality standards of the Local Norwegian Car Mechanic Website project.

Remember: Tests are documentation. Make them clear, focused, and valuable to future developers.