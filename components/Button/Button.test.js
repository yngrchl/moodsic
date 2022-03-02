import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders Button unchanged', () => {
    const { container } = render(<Button type="login" />);
    expect(container).toMatchSnapshot();
  });

  it('applies href prop as expected', () => {
    const href = '/test.com';

    render(<Button href={href} type="error" />);

    const button = screen.getByRole('link');

    expect(button).toHaveAttribute('href', href);
  });

  it('applies text prop as expected', () => {
    const text = 'click me!';

    render(<Button text={text} type="login" />);

    const button = screen.getByText(text);

    expect(button).toBeInTheDocument();
  });
});
