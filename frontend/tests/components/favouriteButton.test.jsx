import { render, fireEvent } from '@testing-library/react';
import FavouriteButton from "../../src/components/FavouriteButton";

describe('FavouriteButton', () => {
  test('renders favourite button with initial count of 0', () => {
    const { getByText } = render(<FavouriteButton />);
    const favouriteButton = getByText(/0/i);
    expect(favouriteButton).toBeInTheDocument();
  });

  test('clicking favourite button toggles favourite status and updates count', () => {
    const { getByText, getByRole } = render(<FavouriteButton />);
    const favouriteButton = getByRole('button');

    fireEvent.click(favouriteButton);
    expect(getByText(/1/i)).toBeInTheDocument(); // Count should be 1 after clicking

    fireEvent.click(favouriteButton);
    expect(getByText(/0/i)).toBeInTheDocument(); // Count should be 0 after clicking again
  });

  test('favourite button icon changes color when favourited', () => {
    const { getByRole } = render(<FavouriteButton />);
    const favouriteButton = getByRole('button');

    fireEvent.click(favouriteButton);
    expect(favouriteButton.querySelector('svg')).toHaveClass('text-red-500'); // Icon color should change when favourited
  });
});
