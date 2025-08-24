import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock component for testing
const TestComponent = ({ children }: { children: React.ReactNode }) => (
  <div data-testid='test-component'>{children}</div>
);

describe('Example Test', () => {
  it('renders test component', () => {
    render(<TestComponent>Hello, World!</TestComponent>);

    const testElement = screen.getByTestId('test-component');
    expect(testElement).toBeInTheDocument();
    expect(testElement).toHaveTextContent('Hello, World!');
  });
});
