import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Footer from './Footer';

describe('Footer', () => {
  it('renders Footer unchanged', () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });

  it('has a link to Github source code', () => {
    render(<Footer />);

    const githubLink = screen.getByRole('link');

    expect(githubLink).toHaveAttribute(
      'href',
      'https://github.com/yngrchl/moodsic',
    );
  });
});
