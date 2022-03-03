import React from 'react';
import { render, screen } from '@testing-library/react';
import Error from '../pages/error';
import { prefixPath } from '../utils/prefix';

describe('Error', () => {
  it('renders a heading', () => {
    render(<Error />);

    const heading = screen.getByRole('heading', {
      name: /oops, something went wrong/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it('renders a try again button', () => {
    render(<Error />);

    const button = screen.getByText('TRY AGAIN FROM THE BEGINNING').closest('a');

    const path = prefixPath('/');
    const formattedPath = path === '/' ? path : path.replace(/\/$/, '');

    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('href', formattedPath);
  });
});
