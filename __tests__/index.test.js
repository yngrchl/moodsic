import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../pages/index';
import { loginUrl } from '../utils/spotify';

describe('Home', () => {
  it('renders Homepage unchanged', () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });

  it('renders a heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', {
      name: /moodsic/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it('renders a login button', () => {
    render(<Home />);

    const button = screen.getByText('LOG IN WITH SPOTIFY').closest('a');

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', loginUrl);
  });
});
