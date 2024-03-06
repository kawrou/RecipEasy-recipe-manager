import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { FavouriteButton } from '../../src/components/RecipePage/FavouriteButton';

describe('FavouriteButton', () => {
  test('renders unfavourited button', () => {
    const { getByAltText } = render(<FavouriteButton />);
    const unfavouritedButton = getByAltText('Unfavourite');
    expect(unfavouritedButton).toBeInTheDocument();
  });

  test.todo('clicking favourite button toggles favourite status and changes the image', async () => {
    const { getByAltText } = render(<FavouriteButton />);
    const button = getByAltText('Unfavourite');

    fireEvent.click(button);

    // Wait for the state change to reflect in the button's alt attribute
    await waitFor(() => {
        expect(button.alt).toBe('Favourite');
    });

    fireEvent.click(button);

    // Wait for the state change to reflect in the button's alt attribute
    await waitFor(() => {
        expect(button.alt).toBe('Unfavourite');
    });
});


  test('favourite button changes image when favourited', () => {
    const { getByAltText } = render(<FavouriteButton />);
    const button = getByAltText('Unfavourite');

    fireEvent.click(button);
    expect(button.src).toContain('favourited.svg'); // Check if image changes to favourited
  });
});
